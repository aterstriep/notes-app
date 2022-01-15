import React from 'react'

export default function NotesList({ notes, activeNote, setActiveNote }) {
    return (
        <ul>
            {notes.map(note => {
                return (
                    <li key={note.id} onClick={() => setActiveNote(note.id)}>{note.title}</li>
                )
            })}
        </ul>
    )
}
