import React, { Component } from 'react';
import './CanvasContainer.css'
import NoteContainer from './NoteContainer'



class CanvasContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            notes: [],
        }
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }

    handleDoubleClick(e) {
        this.setState({
            notes: [...this.state.notes, <NoteContainer x={e.clientX - 50} y={e.clientY - 50} key={this.state.id} />],
            id: this.state.id + 1
        })
    }

    render() {
        console.log(this.state.notes)
        return (
            <div className={'canvas'} onDoubleClick={this.handleDoubleClick}>
                {this.state.notes.map(note => note)}
            </div>
        )
    }
}

export default CanvasContainer;
