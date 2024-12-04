package main

import (
	"fmt"
	"os"
)

func main() {
	if (len(os.Args) != 3) {
		panic("Requires file and part as input! None provided")
	}
	bytes, err := os.ReadFile(os.Args[1])
	if err != nil {
		panic(fmt.Sprintf("Failed to read file '%s': %v", os.Args[1], err))
	}
	text := string(bytes)

	if os.Args[2] == "1" {
		pt1(text)
	} else {
		pt2(text)
	}
}

func pt1(text string) {
}

func pt2(text string) {
}
