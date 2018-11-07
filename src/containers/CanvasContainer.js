import React, { Component } from 'react';
import './CanvasContainer.css'
import Note from '../components/Note'

class CanvasContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 1, //id del sticky
            notes: [], //Array donde cada elemento es un objeto con las características del sticky (text, posición, etc) 
            selectedNotes: [], // Array donde cada elemento es el index del sticky seleccionado
            copiedNotes: [] // Array donde cada elemento es el index del sticky copiado
        }
        this.handleBodyClick = this.handleBodyClick.bind(this)
        this.handleBodyDoubleClick = this.handleBodyDoubleClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleDblClick = this.handleDblClick.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleBodyClick() {
        //Al hacer 1 click en un espacio libre del Canvas deselecciona los stickys que esten seleccionados
        const { notes, selectedNotes } = this.state
        const editedNotes = [...notes]
        selectedNotes.forEach(selectedNote => editedNotes[selectedNote].selected = false) //actualiza el array notes pasando a false la propiedad selectedpara los stickys que estén seleccionados
        this.setState({
            notes: editedNotes,
            selectedNotes: [],
        }) //actualiza el state con todos los stickys deseleccionados
    }

    handleBodyDoubleClick(e) {
        //Al hacer 2 clicks en un espacio libre del Canvas crea un nuevo sticky
        const { notes, selectedNotes, id } = this.state
        const editedNotes = [...notes]
        selectedNotes.forEach(selectedNote => editedNotes[selectedNote].selected = false) // si algun sticky está seleccionado lo deselecciona
        this.setState({
            notes: [...editedNotes, {
                text: '', //Comienza con texto vacío
                x: e.clientX - 50, //setea x en función de posición del click menos la mitad del tamaño del sticky (para centrarlo)
                y: e.clientY - 50, //setea y en función de posición del click menos la mitad del tamaño del sticky (para centrarlo)
                id: `n${id}`, // asigna id al sticky nuevo
                edit: false, //campo que indica si el sticky esta editable (nace en false)
                selected: true //campo que indica si el sticky esta seleccionado (nace en true)
            }],
            id: id + 1, //incrementa id para el proximo sticky
            selectedNotes: [editedNotes.length] // como el sticky nace seleccionado (solo el nuevo) reemplaza el arreglo de stickys seleccionados con la posición del nuevo sticky
        })
    }

    handleClick(e) {
        // Al hacer click en un sticky lo selecciona
        e.stopPropagation() //evita que se ejecute el handleClick del canvas
        const { notes, selectedNotes } = this.state
        const index = notes.findIndex(note => note.id === e.target.id) //encuentra la posicion del sticky clickeado en el arreglo notes
        const editedNotes = [...notes]
        editedNotes[index].selected = !editedNotes[index].selected //invierte el campo selected en el arreglo auxiliar de notes

        if (e.shiftKey) { //si se hace click con el shift presionado agrega o saca el index de selectedNotes
            const editedSelectedNotes = [...selectedNotes]
            if (!editedNotes[index].selected) { //si el sticky estaba seleccionado lo elimina del arreglo selectedNotes 

                editedSelectedNotes.splice(editedSelectedNotes.indexOf(index), 1)
            } else { //si no estaba seleccionado agrega el index del sticky al selectedNotes
                editedSelectedNotes.push(index)
            }
            this.setState({
                notes: editedNotes,
                selectedNotes: editedSelectedNotes
            })
        } else { //si no esta shift presionado le modifica la propiedad selected a false a todos los que estaban seleccionados y true al seleccionado
            if (selectedNotes.length) {
                selectedNotes.forEach(selectedNote => editedNotes[selectedNote].selected = false)
                editedNotes[index].selected = true // si selecciono un solo sticky lo mantengo seleccionado (aunque ya lo estuviera y haya sido borrado en la lìnea de arriba)
            }
            this.setState({
                notes: editedNotes,
                selectedNotes: [index]
            })
        }
    }

    handleDblClick(e) {
        //Al hacer doble click habilita que el sticky sea editable
        e.stopPropagation() //evita que se ejecute el handleDblClick del canvas
        const { notes } = this.state
        const index = notes.findIndex(note => note.id === e.target.id) //encuentra la posicion del sticky clickeado en el arreglo notes
        const editedNotes = [...notes]
        editedNotes[index].edit = true //Asigna true la propiedad edit del sticky seleccionado
        this.setState({
            notes: editedNotes,
        })
    }

    handleKeyPress(e) {
        // gestiona los shorcuts Ctrl+C y Ctrl+V
        const { selectedNotes, notes, id, copiedNotes } = this.state
        if ((e.ctrlKey || e.metaKey) && e.which === 67) { //Ctrl+C
            const copiedNotes = [] //inicializa copiedNotes
            selectedNotes.forEach(noteIndex => copiedNotes.push(Object.assign({}, notes[noteIndex]))) //crea un objeto nuevo con las mismas propiedades para cada sticky seleccionado y lo pushea en el arreglo copiedNotes
            return this.setState({
                copiedNotes: copiedNotes
            })
        }
        if ((e.ctrlKey || e.metaKey) && e.which === 86) { //Ctrl+V
            var newNotes = [...notes]
            var newId = id
            var newSelectedNotes = [...selectedNotes]
            newSelectedNotes.forEach(noteIndex => newNotes[noteIndex].selected = false) //pasa a false los stickys seleccionados (para que queden deseleccionados luego de pegar los nuevos)
            newSelectedNotes = [] // limpia los selectedNotes
            const newCopiedNotes = [] // limpia los copiedNotes
            copiedNotes.forEach(note => { //crea nuevos stickys copiando las propiedades de cada sticky en copiedNotes
                note.x += 100 // toma la posición del sticky copiado y lo mueve 100 px en x
                note.y += 100 // toma la posición del sticky copiado y lo mueve 100 px en y
                note.key = newId //asigna key (nueva)
                note.id = `n${newId}` //asigna id (nuevo)
                newNotes.push(note) //agrega el nuevo sticky a notes
                newSelectedNotes.push(newNotes.length - 1) //suma el sticky nuevo al selectedNotes
                newCopiedNotes.push(Object.assign({}, note)) //suma una copia del sticky nuevo al copiedNotes por si el usuario vuelve a pegar
                newId++ //incrementa el id
            })
            return this.setState({
                id: newId,
                notes: newNotes,
                selectedNotes: newSelectedNotes,
                copiedNotes: newCopiedNotes
            })
        }
        if ((e.which === 46 || e.which === 8) && selectedNotes) { //si presiona delete borra los stickys seleccionados
            var editedNotes = [...notes]
            selectedNotes.sort((a, b) => b - a).forEach((noteIndex) => editedNotes.splice(noteIndex, 1)) //primero ordena el arrego selectedNotes para luego tomar cada index y eliminarlo del arreglo notes
            return this.setState({
                notes: editedNotes,
                selectedNotes: []
            })
        }
    }

    handleChange(e) {
        //actualiza la propiedad text cuando se clickea fuera del sticky con lo que completo el usuario (en onBlur)
        const { notes } = this.state
        var index = notes.findIndex(note => note.id === e.target.id) //encuentra la posicion del sticky donde se está escribiendo en el arreglo notes
        var editedNotes = [...notes]
        editedNotes[index].text = e.target.textContent // modifica la propiedad text del sticky en el que se está escribiendo
        editedNotes[index].selected = false //pasa la propiedad selected a false (porque ocurre cuando se clickeo fuera del sticky)
        editedNotes[index].edit = false //pasa la propiedad edit a false (porque ocurre cuando se clickeo fuera del sticky)
        this.setState({
            notes: editedNotes,
        })
    }

    componentDidMount() {
        //agrega el eventListener en el body para los shortcuts
        document.body.addEventListener('keydown', this.handleKeyPress)
    }

    render() {
        const { notes } = this.state
        return (
            <div className={'canvas'} onClick={this.handleBodyClick} onDoubleClick={this.handleBodyDoubleClick} >
                {notes.map(note =>
                    <Note text={note.text}
                        x={note.x}
                        y={note.y}
                        id={note.id}
                        key={note.id}
                        selected={note.selected}
                        edit={note.edit}
                        handleClick={this.handleClick}
                        handleDblClick={this.handleDblClick}
                        handleChange={this.handleChange} />)}
            </div>
        )
    }
}

export default CanvasContainer;