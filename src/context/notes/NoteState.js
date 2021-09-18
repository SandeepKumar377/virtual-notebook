import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
    const notesInitial=[
        {
          "_id": "6141e475f5a8bfff4220b1e4",
          "user": "61406dbf1127b52a47f57fe3",
          "title": "Title3",
          "description": "Description2",
          "tag": "tag2",
          "date": "2021-09-15T12:17:57.309Z",
          "__v": 0
        },
        {
            "_id": "6141e475f5a8bfff4220b1e4",
            "user": "61406dbf1127b52a47f57fe3",
            "title": "Title3",
            "description": "Description2",
            "tag": "tag2",
            "date": "2021-09-15T12:17:57.309Z",
            "__v": 0
          } ,
          {
            "_id": "6141e475f5a8bfff4220b1e4",
            "user": "61406dbf1127b52a47f57fe3",
            "title": "Title3",
            "description": "Description2",
            "tag": "tag2",
            "date": "2021-09-15T12:17:57.309Z",
            "__v": 0
          } ,
          {
            "_id": "6141e475f5a8bfff4220b1e4",
            "user": "61406dbf1127b52a47f57fe3",
            "title": "Title3",
            "description": "Description2",
            "tag": "tag2",
            "date": "2021-09-15T12:17:57.309Z",
            "__v": 0
          } ,
          {
            "_id": "6141e475f5a8bfff4220b1e4",
            "user": "61406dbf1127b52a47f57fe3",
            "title": "Title3",
            "description": "Description2",
            "tag": "tag2",
            "date": "2021-09-15T12:17:57.309Z",
            "__v": 0
          }  
      ]
      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}} >
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;