import React, { useEffect, useState } from 'react'
import NoteForm from './components/NoteForm'
import Sidebar from './components/Sidebar';
import Note from './components/Note';

export default function App() {

  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState([]);

  const [activeNote, setActiveNote] = useState({});

  const handleSaveNote = (e, note) => {
    e.preventDefault();

    fetch("http://localhost:8000/notes", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(note)
    })
      .then(response => response.text())
      .then(data => {
        setNote(JSON.parse(data).note);
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetch("http://localhost:8000/notes")
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(data => {

          setNotes(data.notes);

          if(!Object.keys(activeNote).length) {
            setActiveNote(data.notes[0]);
          }

        })
        .catch(error => {
          console.error(error);
        })
  }, [note])

  return (
    <>
      <Sidebar notes={notes} activeNote={activeNote} setActiveNote={setActiveNote} />
      <main>
        <Note activeNote={activeNote} />
        {/* <NoteForm saveNote={handleSaveNote} action="create" /> */}
      </main>
    </>
  )

}

