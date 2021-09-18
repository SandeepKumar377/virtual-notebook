import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "6141e475f5a8bfff4220b1e4q",
      "user": "61406dbf1127b52a47f57fe3",
      "title": "Title3",
      "description": "Description2",
      "tag": "tag2",
      "date": "2021-09-15T12:17:57.309Z",
      "__v": 0
    },
    {
      "_id": "6141e475f5a8bfff4220b1e4w",
      "user": "61406dbf1127b52a47f57fe3",
      "title": "Title3",
      "description": "Description2",
      "tag": "tag2",
      "date": "2021-09-15T12:17:57.309Z",
      "__v": 0
    },
    {
      "_id": "6141e475f5a8bfff4220b1e4e",
      "user": "61406dbf1127b52a47f57fe3",
      "title": "Title3",
      "description": "Description2",
      "tag": "tag2",
      "date": "2021-09-15T12:17:57.309Z",
      "__v": 0
    },
    {
      "_id": "6141e475f5a8bfff4220b1e4r",
      "user": "61406dbf1127b52a47f57fe3",
      "title": "Title3",
      "description": "Description2",
      "tag": "tag2",
      "date": "2021-09-15T12:17:57.309Z",
      "__v": 0
    },
    {
      "_id": "6141e475f5a8bfff4220b1e4t",
      "user": "61406dbf1127b52a47f57fe3",
      "title": "Title3",
      "description": "Description2",
      "tag": "tag2",
      "date": "2021-09-15T12:17:57.309Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)

  // Add Note function
  const addNote = (title, description, tag) => {
    console.log("addnote")
    const note = {
      "_id": "6141e475f5a8bfff4220b1e4t",
      "user": "61406dbf1127b52a47f57fe3",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-15T12:17:57.309Z",
      "__v": 0
    };
    setNotes(notes.concat(note))

  }
  // Delete Notes function
  const deleteNote = (id) => {

  }
  // Edit Notes function
  const editNote = (id) => {

  }




  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }} >
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;