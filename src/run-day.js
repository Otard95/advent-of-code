/**
 * @param {number} year
 * @param {number} day
 * @param {string} input
 * @returns {Promise<void>}
 */
const runDay = async (year, day, input) => {
  console.log('[RUN] Running day', day, 'for year', year, 'part 1')
  await require(`../${year}/${day}/pt1`).main(input)
  console.log('\n[RUN] Running day', day, 'for year', year, 'part 2')
  await require(`../${year}/${day}/pt2`).main(input)
}

module.exports = runDay
