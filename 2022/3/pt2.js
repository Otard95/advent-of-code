const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const lines = require("../../utils/lines")
const not = require("../../utils/not")
const reverse = require("../../utils/reverse")
const ascii = require("../../utils/ascii")
const sum = require("../../utils/sum")

const priority = item => 
      ascii(item).isLowercase()
        ? ascii(item) - 96
        : ascii(item) - 38

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const rucksacks = lines(input)
    .filter(flow(isEmpty, not))
    .map(
      rucksack => rucksack
        .split('')
        .map(item => 1n << (BigInt(ascii(item)) - 65n))
        .reduce((acc, item) => acc | item, 0n)
    )
  // Group rucksacks into groups of 3
  const groups = []
  for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push(rucksacks.slice(i, i + 3))
  }
  // Map each group to the unique item in all 3 rucksacks
  const groupItem = groups.map(group => {
    const [rucksack1, rucksack2, rucksack3] = group
    return rucksack1 & rucksack2 & rucksack3
  })

  // Map each groups unique item to its type
  const groupType = groupItem.map(item => String.fromCharCode(reverse(item.toString(2)).indexOf('1') + 65))

  // Map each groups unique item type to its priority
  const groupPriority = groupType.map(priority)

  console.log('Rucksack priority', groupPriority)
  console.log('Rucksack priority sum', sum(groupPriority))
  // console.log('Rucksack priority sum', sum(rucksacks.map(r => r.priority)))
}

module.exports.main = main
