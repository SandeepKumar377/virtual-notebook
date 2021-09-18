import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return (
        <div className="col-sm-3 my-2">           
            
            <div className="card">
                <div className ="card-body">
                <h5 className ="card-title">{note.title}</h5>
                <p className ="card-text">{note.description}</p>
                <p className ="card-text">{note.tag}</p>
                <i className="far fa-trash-alt mx-2"></i>
                <i className="far fa-edit mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
