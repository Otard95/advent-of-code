/**
 * Deeply clone an object or array.
 * @param {Object|Array} obj
 */
export default function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}
