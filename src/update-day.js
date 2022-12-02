const { resolve } = require('node:path')
const {
  accessSync,
  writeFileSync,
  readFileSync,
  constants,
} = require('node:fs')
const fetchTask = require('./fetch-task')
const { parseTask } = require('./parse')

const updateDay = async (year, day) => {
  const html = await fetchTask(year, day)
  const markdown = parseTask(html)

  const readmeFile = resolve(process.cwd(), year, day, 'README.md')

  try {
    accessSync(readmeFile, constants.R_OK | constants.W_OK)
  } catch (err) {
    console.error(`${readmeFile} does not exist or is not readable`)
    process.exit(1)
  }

  const current = readFileSync(readmeFile, 'utf8')

  const currentHash = current.replace(/\s/g, '')
  const newHash = markdown.replace(/\s/g, '')

  if (currentHash === newHash) {
    console.log('README.md is up to date')
    process.exit(0)
  }

  writeFileSync(
    readmeFile,
    markdown,
    { encoding: 'utf-8' },
  )

  console.log('README.md updated')
}

module.exports = updateDay
