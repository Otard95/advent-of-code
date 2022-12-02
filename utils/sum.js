module.exports = (...args) =>
  args
    .flat(Infinity)
    .reduce((sum, number) => sum + number, 0)
