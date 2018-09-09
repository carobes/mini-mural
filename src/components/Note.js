import React from 'react';
import './note.css';

export default function (props) {
    console.log(props)
    return (
        <div className={'note'} style={{ left: props.x + 'px', top: props.y + 'px' }} >

        </div >

    )
}

