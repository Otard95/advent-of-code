# Advent Of Code

My Advent of Code solutions across multiple years and languages.

## Setup

Add your AoC session token to `./.env`:
```
AOC_SESSION=your_session_token_here
```

Build the CLI tool:
```bash
cd cli
go build -o aoc main.go
cd ..
```

## Initialize a New Day

Use the CLI to create a new day from a template and download the input:

```bash
./cli/aoc init <template> [day] [year]
```

For example, to initialize today's puzzle with the Zig template:
```bash
./cli/aoc init zig
```

Or for a specific day and year:
```bash
./cli/aoc init zig 1 2025
```

This will:
- Copy the template from `./base/<template>/` to `./<year>/<day>/`
- Download your puzzle input from AoC to `input.txt`

## Project Structure

- `cli/` - Go CLI tool for managing AoC days
- `base/` - Base templates for different languages (e.g., `zig`)
- `<year>/<day>/` - Individual day solutions

Previous years contain solutions in JavaScript, C, Go, and other languages.
