const fetch = require('node-fetch')

/**
 * @param {number} year
 * @param {number} day
 * @returns {string}
 */
const url = (year, day) => `https://adventofcode.com/${year}/day/${day}/input`

/**
 * @param {number} year
 * @param {number} day
 * @returns {Promise<string>}
 */
const fetchInput = async (year, day) => {
  const response = await fetch(url(year, day), {
    headers: {
      cookie: `session=${process.env.AOC_SESSION}`,
    },
  })
  return response.text()
}

module.exports = fetchInput
