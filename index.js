require('dotenv/config')
const { program } = require('commander')
const createDay = require('./src/create-day')
const fetchInput = require('./src/fetch-input')
const runDay = require('./src/run-day')
const { isNumeric } = require('./utils/is')

program
  .arguments('<year> <day>')
  .action(async (year, day) => {
    if (!isNumeric(year)) {
      console.error('Year must be a number')
      process.exit(1)
    }
    if (!isNumeric(day)) {
      console.error('Day must be a number')
      process.exit(1)
    }

    const input = await fetchInput(year, day)
    await runDay(year, day, input)
  })

program
  .command('setup <year> <day>')
  .action(async (year, day) => {
    if (!isNumeric(year)) {
      console.error('Year must be a number')
      process.exit(1)
    }
    if (!isNumeric(day)) {
      console.error('Day must be a number')
      process.exit(1)
    }

    await createDay(year, day)
  })


program.parse()
