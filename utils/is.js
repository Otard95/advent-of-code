/**
 * @param {any} value
 * @returns {value is number}
 */
const isNumber = (value) => typeof value === 'number'
module.exports.isNumber = isNumber
/**
 * @param {any} value
 */
const isNumeric = (value) => !isNaN(Number(value))
module.exports.isNumeric = isNumeric
/**
 * @param {any} value
 * @returns {value is string}
 */
const isString = (value) => typeof value === 'string'
module.exports.isString = isString
/**
 * @param {any} value
 * @returns {value is boolean}
 */
const isBoolean = (value) => typeof value === 'boolean'
module.exports.isBoolean = isBoolean
/**
 * @param {any} value
 * @returns {value is null}
 */
const isNull = (value) => value === null
module.exports.isNull = isNull
/**
 * @param {any} value
 * @returns {value is undefined}
 */
const isUndefined = (value) => value === undefined
module.exports.isUndefined = isUndefined
/**
 * @param {any} value
 * @returns {value is unknown[]}
 */
const isArray = (value) => Array.isArray(value)
module.exports.isArray = isArray
/**
 * @param {any} value
 * @returns {value is Record<string, unknown>}
 */
const isObject = (value) => typeof value === 'object' && !isArray(value) && !isNull(value)
module.exports.isObject = isObject
/**
 * @param {any} value
 */
module.exports.isEmpty = (value) => {
  if (isString(value)) {
    return value.length === 0
  }
  if (isArray(value)) {
    return value.length === 0
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0
  }
  return isUndefined(value) || isNull(value)
}
