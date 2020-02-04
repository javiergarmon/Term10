const Space = require('./Space')

class App {
  constructor () {
    this.spaces = []
    this.tabs = []

    this.addSpace()
  }

  addSpace () {
    console.log('addSpace')
    const space = new Space()
    this.spaces.push(space)
    this.tabs.push(space.tab)
  }
}

module.exports = App
