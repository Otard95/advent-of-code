package fs

import (
	"io"
	"os"
	"path"
)

func IsFile(path string) bool {
	stat, err := os.Stat(path)
	if err != nil {
		return false
	}
	return stat.Mode().IsRegular()
}

func IsLink(path string) bool {
	stat, err := os.Lstat(path)
	if err != nil {
		return false
	}
	return stat.Mode()&os.ModeSymlink == os.ModeSymlink
}

func IsDir(path string) bool {
	stat, err := os.Stat(path)
	if err != nil {
		return false
	}
	return stat.IsDir()
}

func CopyDir(src, dest string) error {
	entries, err := os.ReadDir(src)
	if err != nil {
		return err
	}

	stat, err := os.Stat(src)
	if err != nil {
		return err
	}

	err = os.MkdirAll(dest, stat.Mode())
	if err != nil {
		return err
	}

	for _, entry := range entries {
		source := path.Join(src, entry.Name())
		destination := path.Join(dest, entry.Name())
		if entry.IsDir() {
			err = CopyDir(source, destination)
			if err != nil {
				return err
			}
		} else if entry.Type().IsRegular() {
			out, err := os.Create(destination)
			if err != nil {
				return err
			}

			defer out.Close()

			in, err := os.Open(source)
			if err != nil {
				return err
			}

			defer in.Close()

			_, err = io.Copy(out, in)
			if err != nil {
				return err
			}
		}
	}

	return nil
}
