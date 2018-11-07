import React, { Component } from 'react';
import CanvasContainer from './containers/CanvasContainer.js'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <CanvasContainer />
      </div>
    )
  }
}

export default App;
