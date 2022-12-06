const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const lines = require("../../utils/lines")
const not = require("../../utils/not")
const and = require("../../utils/and")

/**
 * @param {string} value
 */
const main = async (input) => {
  const groups = lines(input).filter(
    and(
      flow(isEmpty, not),
      line => {
        const [[ a1, a2 ], [b1, b2]] = line.split(',').map(part => part.split('-').map(Number))
        const overlaps = (a1 <= b1 === a2 >= b2) || (a1 >= b1 === a2 <= b2)
        return overlaps
      }
    )
  )
  console.log('groups', groups.length)
}
const test = async () => {
}

module.exports.main = main
module.exports.test = test
