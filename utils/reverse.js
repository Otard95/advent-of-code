const {isObject, isString} = require("./is")


const reverseObject = obj => Object.fromEntries(
  Object.entries(obj)
    .map(([key, value]) => [value, key])
)

const reverseString = str => str.split('').reverse().join('')

module.exports = val => {
  if (isObject(val))
    return reverseObject(val)
  if (isString(val))
    return reverseString(val)
  if (Array.isArray(val))
    return val.reverse()

  throw new Error("Cannot reverse value of type " + typeof val)
}
