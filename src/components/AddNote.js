import React,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"",description:"", tag:""})

    const addNotefuncton=(e)=>{
        e.preventDefault();    //This function use for "not reload page"
        addNote(note.title, note.description, note.tag);
    }
    const addNoteOnChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (

        <div className="container">
            <h2>Add Notes</h2>
            <form className="my-5">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={addNoteOnChange} id="title" name="title" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={addNoteOnChange} id="description" name="description" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={addNoteOnChange} id="tag" name="tag" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={addNotefuncton}>Add note</button>
            </form>
        </div>

    )
}

export default AddNote