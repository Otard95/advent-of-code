/**
 * The flow function is used to create a function that will execute a series of
 * functions in order. The functions are passed as arguments to the flow function.
 */
module.exports = (...funcs) => {
  return (value) => {
    return funcs.reduce((acc, func) => {
      return func(acc)
    }, value)
  }
}
