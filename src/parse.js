const parser = require('htmlparser2')
const { find, hasAttrib, textContent } = require('domutils')

const isTaskDescription = (node) => hasAttrib(node, 'class') && node.attribs.class === 'day-desc'

/**
 * Break up lines that are too long
 *
 * @param {string} text - Markdown
 * @returns {string} Markdown
 */
const breakLines = (text, indent = '') => {
  const lines = text.split('\n')
  const newLines = lines.map((line) => {
    if (line.length > 80) {
      const words = line.split(' ')
      let newLine = ''
      let currentLine = ''
      words.forEach((word) => {
        if (currentLine.length + word.length > 80) {
          newLine += `${currentLine.replace(/\s+$/, '')}\n${indent}`
          currentLine = ''
        }
        currentLine += `${word} `
      })
      newLine += currentLine.replace(/\s+$/, '')
      return newLine
    }
    return line
  })
  return newLines.join('\n')
}

const SPACE_PLACEHOLDER = '\u200B'

const tagToMarkdown = (tag) => {
  switch (tag.name) {
    case 'h1':
      return `# ${textContent(tag)}\n\n`
    case 'h2':
      return `## ${textContent(tag)}\n\n`
    case 'h3':
      return `### ${textContent(tag)}\n\n`
    case 'h4':
      return `#### ${textContent(tag)}\n\n`
    case 'article':
      return documentToMarkdown(tag.children)
    case 'p':
      return `${breakLines(documentToMarkdown(tag.children))}\n`.replace(/\u200B/g, ' ')
    case 'em':
      return `**${documentToMarkdown(tag.children)}**`.replace(/ /g, SPACE_PLACEHOLDER)
    case 'a':
      return `[${textContent(tag)}](https://adventofcode.com${tag.attribs.href})`.replace(/ /g, SPACE_PLACEHOLDER)
    case 'pre':
      return `\`\`\`\n${textContent(tag)}\n\`\`\`\n`
    case 'code':
      return `\`${textContent(tag)}\``.replace(/ /g, SPACE_PLACEHOLDER)
    case 'ul':
      return `${documentToMarkdown(tag.children)}\n`
    case 'li':
      return ` - ${breakLines(documentToMarkdown(tag.children), '   ')}`
    default:
      return documentToMarkdown(tag.children)
  }
}

const documentToMarkdown = (html) => {
  if (Array.isArray(html)) {
    return html.map(documentToMarkdown).join('')
  }
  let markdown = ''
  switch (html.type) {
    case 'text':
      markdown += html.data
      break
    case 'tag':
      markdown += tagToMarkdown(html)
      break
  }
  return markdown
}


/**
 * @param {string} html
 * @returns {string} Markdown
 */
const parseTask = (html) => {
  const parsed = parser.parseDocument(html)
  const article = find(isTaskDescription, [parsed], true, 2)
  const text = documentToMarkdown(article)
  return text
}

const parseAnswer = (html) => {
  const parsed = parser.parseDocument(html)
  const article = find(node => node.name === 'article', [parsed], true, 1)
  const text = documentToMarkdown(article)
  return text
}

module.exports = {
  parseTask,
  parseAnswer,
}
