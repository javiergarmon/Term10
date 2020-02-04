const Terminal = require('./Terminal')

class Space {
  constructor () {
    this.tab = null
    this.terminals = []

    this.addTerminal()
  }

  addTerminal () {
    console.log('addTerminal')
    const terminal = new Terminal({
      dom: 'terminal1',
      shell: 'ubuntu.exe'
    })

    this.terminals.push(terminal)
  }
}

module.exports = Space
