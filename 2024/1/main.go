package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
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
	left, right := parseFile(text)
	slices.Sort(left)
	slices.Sort(right)

	fmt.Printf("left: %v\nright: %v\n", left, right)

	dists := make([]int, len(left))

	for i := range len(left) {
		dists[i] = abs(left[i] - right[i])
	}

	sum := 0
	for _, dist := range dists {
		sum += dist
	}

	fmt.Printf("Total dist: %d", sum)
}

func pt2(text string) {
	left, right := parseFile(text)

	multMap := make(map[int]int)
	for _, n := range right {
		multMap[n] += 1
	}

	sum := 0
	for _, n := range left {
		sum += n * multMap[n]
	}

	fmt.Printf("Total score: %d", sum)
}

func abs(a int) int {
	if a < 0 {
		return a * -1
	}
	return a
}

func parseFile(text string) ([]int, []int) {
	var left_nums, right_nums []int

	lines := strings.Split(text, "\n")
	for _, line := range lines {
		if len(strings.TrimSpace(line)) == 0 {
			continue
		}
		left_num, right_num := parseLine(line)
		left_nums = append(left_nums, left_num)
		right_nums = append(right_nums, right_num)
	}

	return left_nums, right_nums
}

func parseLine(line string) (int, int) {
	var nums [2]string
	var side int

	for _, rune := range line {
		if rune == ' ' {
			if len(nums[0]) > 0 {
				side = 1
			}
			continue
		}
		nums[side] += string(rune)
		// fmt.Printf("%v\n", nums)
	}

	return atoi(nums[0]), atoi(nums[1])
}

func atoi(numeric string) int {
	num, err := strconv.Atoi(numeric)
	if err != nil {
		panic(err)
	}
	return num
}
