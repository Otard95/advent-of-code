/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"

	"github.com/Otard95/advent-of-code/cli/lib/fs"
	"github.com/spf13/cobra"
)

// initCmd represents the init command
var initCmd = &cobra.Command{
	Use:   "init <template> [day] [year]",
	Short: "Initialize the template and get the input for a given day of AOC",
	Args:  cobra.RangeArgs(1, 3),
	Run: func(cmd *cobra.Command, args []string) {
		src := path.Join("base", args[0])
		if !fs.IsDir(src) {
			log.Fatalf("No template '%s' exists in './base/'", args[0])
		}

		day := time.Now().Day()
		year := time.Now().Year()

		if len(args) > 1 {
			if argDay, err := strconv.Atoi(args[1]); err != nil {
				log.Fatalf("'%s' is not numeric: %e", args[1], err)
			} else {
				day = argDay
			}
		}
		if len(args) > 2 {
			if argYear, err := strconv.Atoi(args[2]); err != nil {
				log.Fatalf("'%s' is not numeric: %e", args[2], err)
			} else {
				year = argYear
			}
		}

		dest := path.Join(strconv.Itoa(year), strconv.Itoa(day))

		fmt.Printf("Initializing '%s' with the %s (%s) template", dest, args[0], src)

		err := fs.CopyDir(src, dest)
		if err != nil {
			log.Fatalf("Failed to copy '%s' to '%s': %e", src, dest, err)
		}

		input, err := getInput(day, year)
		if err != nil {
			log.Fatalf("Failed to get input for the day: %e", err)
		}

		inputFile := path.Join(dest, "input.txt")
		err = os.WriteFile(inputFile, input, 0644)
		if err != nil {
			log.Fatalf("Failed to write input file '%s': %e", inputFile, err)
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// initCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// initCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

func getInput(day, year int) ([]byte, error) {
	session := os.Getenv("AOC_SESSION")
	if session == "" {
		return []byte{}, errors.New("No 'AOC_SESSION' environment variable set")
	}

	req, err := http.NewRequest("GET", fmt.Sprintf("https://adventofcode.com/%d/day/%d/input", year, day), bytes.NewBuffer([]byte{}))
	if err != nil {
		return []byte{}, err
	}

	req.AddCookie(&http.Cookie{Name: "session", Value: session})

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return []byte{}, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return []byte{}, fmt.Errorf("Got %d while fetching input", res.StatusCode)
	}

	bytes, err := io.ReadAll(res.Body)
	if err != nil {
		return []byte{}, err
	}

	return bytes, nil
}
