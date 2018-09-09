import React, { Component } from 'react';
import Note from '../components/Note.js'


class NoteContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Note x={this.props.x} y={this.props.y} />
            </div>
        )
    }
}

export default NoteContainer;
