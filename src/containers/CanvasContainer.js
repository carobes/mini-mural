import React, { Component } from 'react';
import './CanvasContainer.css'
import NoteContainer from './NoteContainer'



class CanvasContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0
        }
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }

    handleDoubleClick(e) {
        this.setState({
            x: e.clientX - 50,
            y: e.clientY - 50
        })
        console.log('coordenada x', e.clientX, "coordenada y", e.clientY)
    }

    render() {
        return (
            <div className={'canvas'} onDoubleClick={this.handleDoubleClick}>
                <NoteContainer x={this.state.x} y={this.state.y} />

            </div>
        )
    }
}

export default CanvasContainer;
