const lines = require('../../utils/lines')
const { isNumeric, isEmpty } = require('../../utils/is')

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  let current = 0
  let max = 0
  lines(input).forEach((line) => {
    if (isNumeric(line)) current += Number(line)
    if (isEmpty(line)) {
      max = Math.max(max, current)
      current = 0
    }
  })
  console.log('Calories', max)
}

module.exports.main = main
