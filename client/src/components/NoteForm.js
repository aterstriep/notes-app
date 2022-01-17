import React, { useEffect, useState } from 'react'
import useNotes from '../hooks/useNotes';

export default function NoteForm({ setNotes, note }) {

    const titlePlaceholder = note.title || "New Note";

    const handleSetNote = (e) => {
        const action = note.title ? "update" : "create";
        setNotes({...note, [e.currentTarget.name]: e.currentTarget.value}, action);
    }

    if(note) {
        return (
            <form>
                <div className="field-wrapper">
                    <input type="text" id="note_title" name="title" onChange={handleSetNote} value={note.title} placeholder={titlePlaceholder} />
                </div>
                <div className="field-wrapper">
                    <textarea id="note_body" name="body" rows="8" onChange={handleSetNote} value={note.body} />
                </div>
            </form>
        )
    }
    return null;
}
