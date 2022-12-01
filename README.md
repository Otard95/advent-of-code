# Advent Of Code

This repo has utils to setup your daily adventure including getting
and parsing the task to markdown. It also handles getting the task input
and passes it to the main function of each part.

## Getting started

Add your AoC session token to a `./.env` with the key `AOC_SESSION`

```bash
# Setup the daily adventure
npm start setup <year> <day>

# Edit your code in ./<year>/<day>/pt<1|2>.js and then
npm start <year> <day>
```
