const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const lines = require("../../utils/lines")
const not = require("../../utils/not")
const reverse = require("../../utils/reverse")
const ascii = require("../../utils/ascii")
const sum = require("../../utils/sum")

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const rucksacks = lines(input)
    .filter(flow(isEmpty, not))
    .map(rucksack => {
      const items = rucksack.split('').map(item => 1n << (BigInt(ascii(item)) - 65n))
      const itemCount = items.length
      const compartment1 = items.slice(0, Math.floor(itemCount / 2))
      const compartment2 = items.slice(Math.floor(itemCount / 2))

      const comp1 = compartment1.reduce((acc, item) => acc | item, 0n)
      const comp2 = compartment2.reduce((acc, item) => acc | item, 0n)
      const itemInBoth = comp1 & comp2

      const typeInBoth = String.fromCharCode(reverse(itemInBoth.toString(2)).indexOf('1') + 65)

      const priority = ascii(typeInBoth).isLowercase()
        ? ascii(typeInBoth) - 96
        : ascii(typeInBoth) - 38

      return {
        itemInBoth,
        typeInBoth,
        ascii: ascii(typeInBoth),
        isLower: ascii(typeInBoth).isLowercase(),
        priority,
      }
    })
  // console.log('Rucksacks', rucksacks)
  console.log('Rucksack priority sum', sum(rucksacks.map(r => r.priority)))
}

module.exports.main = main
