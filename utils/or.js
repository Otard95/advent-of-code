module.exports = (...predicates) => (...args) => {
  for (const predicate of predicates) {
    if (predicate(...args)) {
      return true
    }
  }
  return false
}
