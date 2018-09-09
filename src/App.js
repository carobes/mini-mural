import React, { Component } from 'react';
import NoteContainer from './containers/NoteContainer.js'
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
        {/* <NoteContainer handleDoubleClick={this.handleDoubleClick}></NoteContainer> */}


      </div>
    )
  }
}

export default App;
