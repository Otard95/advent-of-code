const fetch = require('node-fetch')

/**
 * @param {number} year
 * @param {number} day
 * @returns {string}
 */
const url = (year, day) => `https://adventofcode.com/${year}/day/${day}/answer`

/**
 * @param {number} year
 * @param {number} day
 * @returns {Promise<string>}
 */
const postAnswer = async (year, day, part, answer) => {
  const params = new URLSearchParams()
  params.append('level', `${part}`)
  params.append('answer', `${answer}`)
  const response = await fetch(url(year, day), {
    method: 'POST',
    headers: {
      cookie: `session=${process.env.AOC_SESSION}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })
  return await response.text()
}

module.exports = postAnswer
