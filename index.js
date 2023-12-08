require('dotenv/config')
const { writeFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { program } = require('commander')
const createDay = require('./src/create-day')
const fetchInput = require('./src/fetch-input')
const postAnswer = require('./src/post-answer')
const runDay = require('./src/run-day')
const updateDay = require('./src/update-day')
const { parseAnswer } = require('./src/parse')
const { isNumeric, isString } = require('./utils/is')

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
  .command('test <year> <day>')
  .action(async (year, day) => {
    if (!isNumeric(year)) {
      console.error('Year must be a number')
      process.exit(1)
    }
    if (!isNumeric(day)) {
      console.error('Day must be a number')
      process.exit(1)
    }

    console.log('[TEST] Running day', day, 'for year', year, 'part 1')
    await require(`./${year}/${day}/pt1`).test()
    console.log('\n[TEST] Running day', day, 'for year', year, 'part 2')
    await require(`./${year}/${day}/pt2`).test()
  })

program
  .command('setup <year> <day> <lang>')
  .option('-i', '--input', 'Fetch input for the day')
  .action(async (year, day, lang, { i }) => {
    if (!isNumeric(year)) {
      console.error('Year must be a number')
      process.exit(1)
    }
    if (!isNumeric(day)) {
      console.error('Day must be a number')
      process.exit(1)
    }
    if (!isString(lang) && lang.length === 0) {
      console.error('Language must be a string')
      process.exit(1)
    }

    await createDay(year, day, lang)
    if (i) {
      const input_content = await fetchInput(year, day)
      writeFileSync(
        resolve(process.cwd(), year, day, 'input.txt'),
        input_content,
        { encoding: 'utf-8' },
      )
    }
  })

program
  .command('update <year> <day>')
  .action(async (year, day) => {
    if (!isNumeric(year)) {
      console.error('Year must be a number')
      process.exit(1)
    }
    if (!isNumeric(day)) {
      console.error('Day must be a number')
      process.exit(1)
    }

    await updateDay(year, day)
  })

program
  .command('submit <year> <day> <part> <answer>')
  .action(async (year, day, part, answer) => {
    if (!isNumeric(year)) {
      console.error('Year must be a number')
      process.exit(1)
    }
    if (!isNumeric(day)) {
      console.error('Day must be a number')
      process.exit(1)
    }
    if (!isNumeric(part)) {
      console.error('Part must be a number')
      process.exit(1)
    }

    const text = await postAnswer(year, day, part, answer)

    console.log(parseAnswer(text))
  })

program.parse()
