const lines = require("../../utils/lines")
const ascii = require("../../utils/ascii")
const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const not = require("../../utils/not")

/**
 * @param {string} str
 */
const indexOfMarker = str => {
  const flags = str.trim().split('').map(char => 1n << (BigInt(ascii(char)) - 65n))
  for (let i = 0; i < flags.length - 3; i++) {
    let flag = flags[i]
    const unique = flags.slice(i + 1, i + 4).reduce((acc, f) => {
      if (!acc || (flag & f) > 0n) return false
      flag |= f
      return true
    }, true)
    if (unique) return i + 4
  }
  return -1
}

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const indices = lines(input).filter(flow(isEmpty, not)).map(indexOfMarker)
  console.log('output', indices)
}
const test = async () => {
  // Your test code here
  main(`
bvwbjplbgvbhsrlpgdmjqwftvncz
nppdvjthqldpwncqszvftbrmjlhg
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`)
}

module.exports.main = main
module.exports.test = test
