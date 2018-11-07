import React from 'react';
import './note.css';

export default function (props) {
    const { id, x, y, edit, selected, handleClick, handleDblClick, handleChange, text } = props
    return (
        <div className={'noteContainer'}
            id={id} //define id del sticky
            contentEditable={edit} // define si el elemento es editable, manejado por la propiedad edit
            suppressContentEditableWarning //elimina el warning de que el elemento es ContentEditable
            style={{ left: `${x}px`, top: `${y}px`, borderColor: selected ? 'orange' : 'transparent' }} //posición del sticky y color de borde si está seleccionado
            onClick={handleClick}
            onDoubleClick={handleDblClick}
            onBlur={handleChange}>
            {text}
        </div >
    )
}

