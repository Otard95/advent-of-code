const flow = require('../../utils/flow')
const not = require('../../utils/not')
const lines = require('../../utils/lines')
const { isEmpty } = require('../../utils/is')
const sum = require('../../utils/sum')

const moves = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
}

// AX DRAW
// AY WIN
// AZ LOSE
// BX LOSE
// BY DRAW
// BZ WIN
// CX WIN
// CY LOSE
// CZ DRAW

const roundMultiplier = (a, b) => {
  if (moves[a] === moves[b]) return 0.5
  switch (a + b) {
    case 'AY':
    case 'BZ':
    case 'CX':
      return 1
  }
  return 0
}

const roundPoints = (a, b) => moves[b] + roundMultiplier(a, b) * 6


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
