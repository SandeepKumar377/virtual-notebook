import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", updateTitle: "", updateDescription: "", updateTag: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, updateTitle: currentNote.title, updateDescription: currentNote.description, updateTag: currentNote.tag })
    }

    const addNotefuncton = (e) => {
        editNote(note.id, note.updateTitle, note.updateDescription, note.updateTag)
        refClose.current.click();
    }
    const addNoteOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Update Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.updateTitle} onChange={addNoteOnChange} id="updateTitle" name="updateTitle" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.updateDescription} onChange={addNoteOnChange} id="updateDescription" name="updateDescription" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.updateTag} onChange={addNoteOnChange} id="updateTag" name="updateTag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" onClick={addNotefuncton} className="btn btn-primary mx-2">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}
export default Notes
