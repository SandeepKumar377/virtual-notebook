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
    const notes= await response.json()
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
      body: JSON.stringify({title, description, tag})
    });
    alert(response)
    const note = {
      "_id": "6141e475f5a8bfff4220b1e4tw",
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
     const json= response.json();
    console.log(json);
    console.log("Note delete");
    alert("Note delete");
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

  }
  // Edit Notes function
  const editNote = async (id, title, description, tag) => {
    //API call
    let url = `${baseApiURL}/api/notes/updatenote/${id}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MDZkYmYxMTI3YjUyYTQ3ZjU3ZmUzIn0sImlhdCI6MTYzMTYyODIzNH0.GOJxgEr0iPRS6e0ME5jKt65gwoISplXvFqfYEFw2mOc'
      },
      body: JSON.stringify({title, description, tag})
    });
    const res = response.json();
    alert(res)

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;

      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;