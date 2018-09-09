import React from 'react';
import './note.css';

export default function (props) {
    return (
        <div  >
            <input type="text" className={'note'} style={{ left: props.x + 'px', top: props.y + 'px' }} onDoubleClick={props.handleDblClick} />
        </div >

    )
}

