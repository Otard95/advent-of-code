const lines = require('../../utils/lines')
const { isEmpty } = require('../../utils/is')
const sum = require('../../utils/sum')
const flow = require('../../utils/flow')
const not = require('../../utils/not')

const move = {
  A: { // Rock
    X: 3, // Scissors LOSE
    Y: 1, // Rock DRAW
    Z: 2, // Paper WIN
  },
  B: { // Paper
    X: 1, // Rock LOSE
    Y: 2, // Paper DRAW
    Z: 3, // Scissors WIN
  },
  C: { // Scissors
    X: 2, // Paper LOSE
    Y: 3, // Scissors DRAW
    Z: 1, // Rock WIN
  },
}

const gameState = {
  X: 0,
  Y: 0.5,
  Z: 1,
}

const roundPoints = (a, b) => move[a][b] + gameState[b] * 6

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const rounds = lines(input).filter(flow(isEmpty, not))
  const results = rounds.map((line) => {
    const [a, b] = line.split(' ')
    return roundPoints(a, b)
  })
  // console.log('NaN Results', results.filter(isNaN))
  console.log('Results:', results, '| Sum', sum(results))
}

module.exports.main = main
