const flow = require("../../utils/flow")
const {isEmpty} = require("../../utils/is")
const lines = require("../../utils/lines")
const not = require("../../utils/not")
const sum = require("../../utils/sum")

/**
 * This class represents a filesystem dirrent(file or directory).
 */
class Dirrent {
  /**
   * @param {'dir'|'file'} type
   * @param {string} name
   * @param {number} size
   * @param {Dirrent} parent
   */
  constructor(type, name, size, parent) {
    this.type = type
    this.name = name
    this.size = size
    this.parent = parent
    /** @type {Map<string, Dirrent>} */
    this.children = new Map()
  }

  /**
   * @returns {number}
   */
  get Size() {
    if (!this.size) {
      this.size = Array.from(this.children.values()).reduce(
        (size, child) => size + child.Size,
        0
      )
    }
    return this.size
  }
}

/**
 * This class parses command line input and outputs to construct a
 * file system tree.
 */
class Parser {
  constructor() {
    this.root = new Dirrent('dir', '', 0, null)
    this.current = this.root
  }

  /**
   * Parse a line of output from the command line.
   * Example lines:
   *   `$ cd /` change directly to /
   *   `$ cd ..` go up one directly
   *   `$ ls` list files
   *   `dir a` directory output
   *   `123 a.txt` file named a with extension txt of size 123
   *
   * @param {string} line
   */
  parse(line) {
    if (line.startsWith('$'))
      this.parseCommand(line)
    else
      this.parseOutput(line)
  }

  /**
   * @param {string} line
   */
  parseCommand(line) {
    const [command, ...args ] = line.replace(/\$ +/, '').split(' ')
    switch (command) {
      case 'cd':
        this.cd(args[0])
        break
      case 'ls':
        this.ls()
        break
      default:
        throw new Error(`Unknown command: ${command}`)
    }
  }

  /**
   * @param {string} arg
   */
  cd(arg) {
    switch (arg) {
      case '/':
        this.current = this.root
        break
      case '..':
        if (!this.current.parent) console.log('Cannot go up from root')
        else this.current = this.current.parent
        break
      default:
        if (!this.current.children.has(arg)) console.log(`No such directory: ${arg}`)
        this.current = this.current.children.get(arg)
    }
  }

  ls() {}

  /**
   * @param {string} line
   */
  parseOutput(line) {
    if (line.startsWith('dir'))
      this.parseDir(line)
    else
      this.parseFile(line)
  }

  /**
   * @param {string} line
   */
  parseDir(line) {
    const [, name] = line.split(' ')
    this.current.children.set(name, new Dirrent('dir', name, 0, this.current))
  }

  /**
   * @param {string} line
   */
  parseFile(line) {
    const [size, name] = line.split(' ')
    this.current.children.set(name, new Dirrent('file', name, Number(size), this.current))
  }

  /**
   * @param {Dirrent} dirrent
   * @param {string} indent
   */
  printDirrent(dirrent, indent = '') {
    switch (dirrent.type) {
      case 'dir':
        console.log(`${indent}${dirrent.name}/ ${dirrent.Size}b`)
        dirrent.children.forEach(dirrent => this.printDirrent(dirrent, `${indent}  `))
        break
      case 'file':
        console.log(`${indent}${dirrent.name} ${dirrent.Size}b`)
        break
      default:
        throw new Error(`Unknown dirrent type '${dirrent.type}'`)
    }
  }

  printFilesystem() {
    this.printDirrent(this.root)
  }

  /**
   * @param {(dirrent: Dirrent) => void} predicate
   * @param {Dirrent|undefined} root
   */
  traverse(predicate, root) {
    let current = root || this.root
    predicate(current)
    current.children.forEach(child => this.traverse(predicate, child))
  }
}

/**
 * @param {string} value
 */
const main = async (input) => {
  // Your code here
  const parser = new Parser()
  lines(input).filter(flow(isEmpty, not)).forEach(line => parser.parse(line))
  parser.printFilesystem()

  const diskSize = 70000000
  const totalUsed = parser.root.Size
  const totalFree = diskSize - totalUsed

  console.log(`Total ${diskSize}b`)
  console.log(`Used ${totalUsed}b(${(totalUsed / diskSize * 100).toFixed(2)}%)`)
  console.log(`Free ${totalFree}b(${(totalFree / diskSize * 100).toFixed(2)}%)`)

  const neededSpace = 30000000
  const neededToFree = neededSpace - totalFree

  console.log(`Needed for update ${neededSpace}b`)
  console.log(`Needed to free ${neededToFree}b`)

  const dirsOfMinSize = []
  parser.traverse(d => d.type === 'dir' && d.size >= neededToFree && dirsOfMinSize.push(d))

  console.log(dirsOfMinSize.sort((a, b) => a.size - b.size).map(d => `${d.name} ${d.Size}`))
}
const test = async () => {
  // Your test code here
  main(`
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`)
}

module.exports.main = main
module.exports.test = test
