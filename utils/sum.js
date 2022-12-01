module.exports = (...args) => args.flat(Infinity).reduce((a, b) => a + b, 0);
