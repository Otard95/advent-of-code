# Advent Of Code

This repo has utils to setup your daily adventure including getting
and parsing the task to markdown. It also handles getting the task input
and passes it to the main function of each part.

## Getting started

Add your AoC session token to a `./.env` with the key `AOC_SESSION`
and `$ npm install`.

Setup your daily adventure with:
```bash
npm start setup <year> <day>
```

Now you should have a directory `./<year>/<day>`
with three files - `README.md`, `pt1.js` and `pt2.js`
The readme has the adventure description the AoC site as Markdown
the js files have the template:
```javascript
/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
}

module.exports.main = main
```

The mail function as you can see takes one arg `input` which
if yout use the below command will be your adventure input from
the AoC site.

```bash
npm start <year> <day>
```
