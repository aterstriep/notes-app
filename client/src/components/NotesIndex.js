import React, { useState } from 'react'

export default function NotesIndex({ notes }) {

    return (
        <div>
            {notes.map(note => {
                return (
                    <div key={note.id} className="note">
                        <h2>{note.title}</h2>
                        <p>{note.body}</p>
                    </div>
                )
            })}
        </div>
    )
}
