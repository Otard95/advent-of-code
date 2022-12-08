const lines = require("../../utils/lines")
const ascii = require("../../utils/ascii")
const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const not = require("../../utils/not")

/**
 * @param {string} str
 */
const indexOfMarker = (str, len) => {
  const flags = str.trim().split('').map(char => 1n << (BigInt(ascii(char)) - 65n))
  for (let i = 0; i < flags.length - len; i++) {
    let flag = flags[i]
    const unique = flags.slice(i + 1, i + len).reduce((acc, f) => {
      if (!acc || (flag & f) > 0n) return false
      flag |= f
      return true
    }, true)
    if (unique) return i + len
  }
  return -1
}

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const indices = lines(input).filter(flow(isEmpty, not)).map(str => indexOfMarker(str, 14))
  console.log('output', indices)
}
const test = async () => {
  // Your test code here
  main(`
mjqjpqmgbljsphdztnvjfqwrcgsmlb
bvwbjplbgvbhsrlpgdmjqwftvncz
nppdvjthqldpwncqszvftbrmjlhg
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`)
}

module.exports.main = main
module.exports.test = test
