import React from 'react'
import ReactDOM from 'react-dom'

import 'bulma'

import Home from './components/Home'

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="container">
        <Home />
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'))
