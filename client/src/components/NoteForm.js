import React, { useEffect, useState } from 'react'
import useNotes from '../hooks/useNotes';

export default function NoteForm({ setNotes, note }) {

    const titlePlaceholder = note.id ? "Title" : "New Note";
    const title = note.title === "Untitled" ? "" : note.title;

    const handleSetNote = (e) => {
        const action = note.id ? "update" : "create";
        let updatedNote = { ...note, [e.currentTarget.name]: e.currentTarget.value };
        setNotes(updatedNote, action);
    }

    if(note) {
        return (
            <form>
                <div className="field-wrapper">
                    <input type="text" id="note_title" name="title" onChange={handleSetNote} value={title} placeholder={titlePlaceholder} />
                </div>
                <div className="field-wrapper">
                    <textarea id="note_body" name="body" rows="8" onChange={handleSetNote} value={note.body} />
                </div>
            </form>
        )
    }
    return null;
}
