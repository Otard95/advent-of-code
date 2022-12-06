/**
 * @param {unknown[]} array
 * @param {(a: unknown, b: unknown) => number} compare
 * @returns {unknown[]}
 */
module.exports = (arr, predicate = (a, b) => a - b) => {
  arr.sort(predicate)
  return arr
}
