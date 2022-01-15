import React, { useEffect, useState } from 'react'
import NotesIndex from './components/NotesIndex'
import NoteForm from './components/NoteForm'

export default function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(data => {
          setNotes(data.notes);
        })
        .catch(error => {
          console.error(error);
        })
  }, [])

  return (
    <div className="page-wrapper">
      <header className="App-header">
      </header>
      <main>
        <NotesIndex notes={notes}/>
        <NoteForm />
      </main>
    </div>
  )

}

