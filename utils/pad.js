/**
 * @param {string} str
 * @param {number} len
 * @param {string} ch
 * @returns {string}
 */
const padLeft = (str, len, ch = ' ') => {
  const pad = ch.repeat(Math.max(0, len))
  return pad + str
}
/**
 * @param {string} str
 * @param {number} len
 * @param {string} ch
 * @returns {string}
 */
const padRight = (str, len, ch = ' ') => {
  const pad = ch.repeat(Math.max(0, len))
  return str + pad
}
/**
 * @param {string} str
 * @param {number} len
 * @param {string} ch
 * @returns {string}
 */
const padLeftTo = (str, len, ch = ' ') => {
  return padLeft(str, len - str.length, ch)
}
/**
 * @param {string} str
 * @param {number} len
 * @param {string} ch
 * @returns {string}
 */
const padRightTo = (str, len, ch = ' ') => {
  return padRight(str, len - str.length, ch)
}

module.exports = {
  padLeft,
  padRight,
  padLeftTo,
  padRightTo,
}
