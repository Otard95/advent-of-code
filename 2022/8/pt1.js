const {default: clone} = require("../../utils/clone")
const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const lines = require("../../utils/lines")
const not = require("../../utils/not")

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const trees = lines(input)
    .filter(flow(isEmpty, not))
    .map(l => l.split('').map(Number))

  console.log('Trees:', trees)

  const maxSurroundingHeights = clone(trees)
  for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
      
      maxSurroundingHeights[y][x] = 
    }
  }
}
const test = async () => {
  // Your test code here
  main(`
30373
25512
65332
33549
35390
`)
}

module.exports.main = main
module.exports.test = test
