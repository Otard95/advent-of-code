const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const lines = require("../../utils/lines")
const not = require("../../utils/not")
const and = require("../../utils/and")
const sort = require("../../utils/sort")

/**
 * @param {string} value
 */
const main = async (input) => {
  const groups = lines(input).filter(
    and(
      flow(isEmpty, not),
      line => {
        const group = sort(
          line
            .split(',')
            .map(part => sort(part.split('-').map(Number))),
          (a, b) => a[0] - b[0]
        )
        const [ [a1, a2], [b1, b2] ] = group
        if (a1 > a2) console.log('a1 > a2', a1, a2)
        if (b1 > b2) console.log('b1 > b2', b1, b2)
        const overlaps = a2 >= b1
        return overlaps
      }
    )
  )
  console.log('groups', groups.length)
}

const test = async () => {
  main(`
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`)
}

module.exports.main = main
module.exports.test = test
