import React, { Component } from 'react';
import Note from '../components/Note.js'


class NoteContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleDblClick = this.handleDblClick.bind(this)

    }

    handleDblClick(e) {
        e.preventDefault()
        e.stopPropagation()
        console.log('click note')
    }

    render() {
        return (
            <div>
                <Note x={this.props.x} y={this.props.y} handleDblClick={this.handleDblClick} />
            </div>
        )
    }
}

export default NoteContainer;
