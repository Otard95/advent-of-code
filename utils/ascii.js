/**
 * @typedef {number & {
 *   printable: () => boolean,
 *   alpha: () => boolean,
 *   uppercase: () => Ascii,
 *   lowercase: () => Ascii,
 *   isUppercase: () => boolean,
 *   isLowercase: () => boolean,
 * }} Ascii
 */

/**
 * @param {string|number} value
 * @returns {Ascii}
 */
module.exports = value => {
  /** @type {Ascii} */
  let ascii
  if (typeof value === "string")
    ascii = value.charCodeAt(0)
  else if (typeof value === "number")
    ascii = value

  if (ascii < 0 || ascii > 127)
    throw new Error("Invalid ASCII value: " + ascii)

  ascii.__proto__.printable = () => ascii >= 32 && ascii <= 126
  ascii.__proto__.alpha = () => (ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)
  ascii.__proto__.uppercase = () => ascii >= 65 && ascii <= 90 ? ascii : ascii(ascii + 32)
  ascii.__proto__.lowercase = () => ascii >= 97 && ascii <= 122 ? ascii : ascii(ascii - 32)
  ascii.__proto__.isUppercase = () => ascii >= 65 && ascii <= 90
  ascii.__proto__.isLowercase = () => ascii >= 97 && ascii <= 122

  return ascii
}
