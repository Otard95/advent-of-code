const lines = require('../../utils/lines')
const { isNumeric, isEmpty } = require('../../utils/is')
const sum = require('../../utils/sum')

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  let current = 0
  let elves = []
  lines(input).forEach((line) => {
    if (isNumeric(line)) current += Number(line)
    if (isEmpty(line)) {
      elves.push(current)
      current = 0
    }
  })
  const topElves = elves.sort((a, b) => b - a).slice(0, 3)
  console.log('Top Elves', topElves, '| Total', sum(topElves))
}

module.exports.main = main
