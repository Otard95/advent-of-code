const { resolve } = require('node:path')
const {
  mkdirSync,
  readdirSync,
  copyFileSync,
  writeFileSync,
} = require('node:fs')
const fetchTask = require('./fetch-task')
const { parseTask } = require('./parse')

const createDay = async (year, day, lang) => {
  const dir = resolve(process.cwd(), year, day)
  mkdirSync(dir, { recursive: true })
  // Make sure dir is empty
  const files = readdirSync(dir)
  if (files.length > 0) {
    console.error(`Directory ${dir} is not empty`)
    process.exit(1)
  }
  // Copy files from ./base
  const baseDir = resolve(process.cwd(), 'base', lang)
  const baseFiles = readdirSync(baseDir)
  baseFiles.forEach((file) => {
    copyFileSync(resolve(baseDir, file), resolve(dir, file))
  })

  const html = await fetchTask(year, day)
  const markdown = parseTask(html)
  writeFileSync(
    resolve(dir, 'README.md'),
    markdown,
    { encoding: 'utf-8' },
  )
}

module.exports = createDay
