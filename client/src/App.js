import React, { useEffect, useState } from 'react'
import NoteForm from './components/NoteForm'
import Sidebar from './components/Sidebar';
import Note from './components/Note';
import useNotes from './hooks/useNotes';

export default function App() {

  const [notes, note, setNotes] = useNotes({});

  const handleSetNotes = (note, type) => {
    setNotes({ data: note, type: type });
    document.getElementById("mobile-menu").classList.remove("active");
  }

  return (
    <>
      <Sidebar notes={notes || []} activeNote={note} setNotes={setNotes} />
      <main>
        <NoteForm setNotes={handleSetNotes} note={note} />
      </main>
    </>
  )

}

