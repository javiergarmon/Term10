const XTerminal = require('xterm').Terminal
const { FitAddon } = require('xterm-addon-fit')
const { spawn } = require('node-pty')

class Terminal {
  constructor (options) {
    this.dom = options.dom
    this.shell = options.shell
    this.xterm = new XTerminal({
      fontFamily: 'Fira Code',
      fontSize: 14,
      lineHeight: 1.2,
      theme: {
        background: '#111'
      }
    })

    this.pty = spawn(this.shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    })

    this.fitAddon = new FitAddon()
    this.xterm.loadAddon(this.fitAddon)

    this.xterm.onResize((e) => {
      this.pty.resize(e.cols, e.rows)
    })

    this.xterm.onKey((e) => {
      const ev = e.domEvent
      // const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;
      if (ev.keyCode === 8) { // Do not delete the prompt
        if (this.xterm._core.buffer.x > 2) {
          this.pty.write('\b \b')
        }
      } else {
        this.pty.write(e.key)
      }
    })

    this.pty.on('data', data => {
      this.fitAddon.fit()
      process.stdout.write(data)
      this.xterm.write(data)
    })

    this.xterm.open(document.getElementById(this.dom))
  }

  resize () {
    this.fitAddon.fit()
  }
}

module.exports = Terminal
