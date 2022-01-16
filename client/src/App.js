import React, { useEffect, useState } from 'react'
import NoteForm from './components/NoteForm'
import Sidebar from './components/Sidebar';
import Note from './components/Note';
import useNotes from './hooks/useNotes';

export default function App() {

  const [notes, setNotes] = useNotes([]);
  const [note, setNote] = useState([]);

  console.log("app")

  const [activeNote, setActiveNote] = useState({});

  const handleSetNotes = (e, note, type) => {
    e.preventDefault();
    setNotes({ data: note, type: type });
  }

  useEffect(() => {
    // fetch("http://localhost:8000/notes")
    //     .then(response => response.text())
    //     .then(response => JSON.parse(response))
    //     .then(data => {

    //       setNotes(data.notes);
          if(notes.length && !Object.keys(activeNote).length) {
            setActiveNote(notes[0]);
          }

    //     })
    //     .catch(error => {
    //       console.error(error);
    //     })
  }, [notes])

  return (
    <>
      <Sidebar notes={notes || []} activeNote={activeNote} setActiveNote={setActiveNote} />
      <main>
        {/* <Note activeNote={activeNote} setNotes={handleSetNotes} /> */}
        <NoteForm setNotes={handleSetNotes} activeNote={activeNote} action="create" />
      </main>
    </>
  )

}

