import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const baseApiURL = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes function
  const getNotes = async () => {
    //API call
    let url = `${baseApiURL}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDZkYmYxMTI3YjUyYTQ3ZjU3ZmUzIn0sImlhdCI6MTYzMTYyODIzNH0.GOJxgEr0iPRS6e0ME5jKt65gwoISplXvFqfYEFw2mOc'
      }
    });
    const notes = await response.json()
    setNotes(notes)
  }

  // Add Note function
  const addNote = async (title, description, tag) => {
    //API call
    let url = `${baseApiURL}/api/notes/addnote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDZkYmYxMTI3YjUyYTQ3ZjU3ZmUzIn0sImlhdCI6MTYzMTYyODIzNH0.GOJxgEr0iPRS6e0ME5jKt65gwoISplXvFqfYEFw2mOc'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    setNotes(notes.concat(note))
  }

  // Delete Notes function
  const deleteNote = async (id) => {
    //API call
    let url = `${baseApiURL}/api/notes/deletenote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDZkYmYxMTI3YjUyYTQ3ZjU3ZmUzIn0sImlhdCI6MTYzMTYyODIzNH0.GOJxgEr0iPRS6e0ME5jKt65gwoISplXvFqfYEFw2mOc'
      }
    });
    // const json = response.json();
    // console.log(json);
    if (response) {
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes)
    } else {
      alert("Internal server erro!")
    }


  }
  // Update Notes function
  const editNote = async (id, title, description, tag) => {
    //API call
    let url = `${baseApiURL}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDZkYmYxMTI3YjUyYTQ3ZjU3ZmUzIn0sImlhdCI6MTYzMTYyODIzNH0.GOJxgEr0iPRS6e0ME5jKt65gwoISplXvFqfYEFw2mOc'
      },
      body: JSON.stringify({ title, description, tag })
    });
    if (response.status === 200) {
      let newNote = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if (element._id === id) {
          element.title = title;
          element.description = description;
          element.tag = tag;
          break;
        }
      }
      setNotes(newNote);
    }
    else{
      alert("Internal server error!")
      return null;
    }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;