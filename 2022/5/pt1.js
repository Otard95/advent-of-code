const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const lines = require("../../utils/lines")
const not = require("../../utils/not")
const trim = require("../../utils/trim")

class State {
  /**
   * @memberof State
   * @private
   * @type {Map<string, []>}
   */
  stacks = new Map()

  /**
   * @param {string[]} init
   */
  constructor(init) {
    const stackDefs = init.pop()
    for (let i = 0; i < stackDefs.length; i++) {
      const char = stackDefs[i]
      if (isEmpty(char.trim())) continue

      const crates = init.map(line => line[i]).reverse().filter(flow(trim, isEmpty, not))
      this.stacks.set(char, crates)
    }
  }

  /**
   * @memberof State
   * @returns {string[]}
   */
  get topCrates() {
    // for each stack, get the top crate
    return Array.from(this.stacks.values()).map(stack => stack[stack.length - 1])
  }

  /**
   * @param {string} fromStack
   * @param {string} toStack
   * @param {number} count
   * @returns {number}
   */
  move(fromStack, toStack, count) {
    const from = this.stacks.get(fromStack)
    const to = this.stacks.get(toStack)
    if (!from || !to) throw new Error("Invalid stack")

    const moved = from.splice(-count).reverse()
    to.push(...moved)

    return moved.length
  }

}

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const res = lines(input).reduce((acc, line) => {
    if (acc.hasStates && !isEmpty(trim(line))) {
      acc.moves.push(line)
    } else {
      if (isEmpty(trim(line)) && acc.state.length > 0) {
        acc.hasStates = true
      } else if (!isEmpty(trim(line))) {
        acc.state.push(line)
      }
    }
    return acc
  }, { state: [], moves: [], hasStates: false })

  const state = new State(res.state)
  console.log('Initial state', state)

  for (const move of res.moves) {
    const [_, count, from, to] = move.match(/move *(\d+) *from *(\d+) *to *(\d+)/)
    const moved = state.move(from, to, Number(count))
    if (moved !== Number(count)) console.log("Invalid move: should have moved", count, "but only moved", moved)
  }

  console.log('Final state', state)
  console.log('Top crates', state.topCrates.join(''))
}
const test = async () => {
  // Your test code here
  main(`
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2

`)
}

module.exports.main = main
module.exports.test = test
