/**
 * @param {any} value
 * @returns {value is number}
 */
module.exports.isNumber = (value) => typeof value === 'number'
/**
 * @param {any} value
 */
module.exports.isNumeric = (value) => !isNaN(Number(value))
/**
 * @param {any} value
 * @returns {value is string}
 */
module.exports.isString = (value) => typeof value === 'string'
/**
 * @param {any} value
 * @returns {value is boolean}
 */
module.exports.isBoolean = (value) => typeof value === 'boolean'
/**
 * @param {any} value
 * @returns {value is null}
 */
module.exports.isNull = (value) => value === null
/**
 * @param {any} value
 * @returns {value is undefined}
 */
module.exports.isUndefined = (value) => value === undefined
/**
 * @param {any} value
 * @returns {value is unknown[]}
 */
module.exports.isArray = (value) => Array.isArray(value)
/**
 * @param {any} value
 * @returns {value is Record<string, unknown>}
 */
module.exports.isObject = (value) => typeof value === 'object' && !array(value)
