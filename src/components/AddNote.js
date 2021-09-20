import React,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"", tag:""})

    const addNotefuncton=(e)=>{
        e.preventDefault();    //This function use for "not reload page"
        addNote(note.title, note.description, note.tag);
        setNote({title:"",description:"", tag:""})
    }
    const addNoteOnChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (

        <div className="container">
            <h2>Add Notes</h2>
            <form className="mb-3">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.title} onChange={addNoteOnChange} id="title" name="title" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.description} onChange={addNoteOnChange} id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.tag} onChange={addNoteOnChange} id="tag" name="tag" />
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5 } className="btn btn-primary" onClick={addNotefuncton}>Add note</button>
            </form>
        </div>

    )
}

export default AddNote