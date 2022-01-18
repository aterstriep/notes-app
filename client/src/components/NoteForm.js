import React, { useEffect, useState } from 'react'

export default function NoteForm({ setNotes, note }) {

    const [activeNote, setActiveNote] = useState(note);
    const [loaded, setLoaded] = useState(false);

    const handleSetNote = (e) => {
        let updatedNote = { ...note, [e.currentTarget.name]: e.currentTarget.value };
        setActiveNote(updatedNote);
    }

    useEffect(() => {
        if(loaded) {
            setNotes(activeNote, "update");
        }
    }, [activeNote])

    useEffect(() => {
        setActiveNote(note);
        setLoaded(true);
    }, [note.id])

    if(activeNote.id) {
        return (
            <form>
                <input type="text" id="note_title" name="title" onChange={handleSetNote} value={activeNote.title} placeholder="Untitled Note" />
                <textarea id="note_body" name="body" rows="8" onChange={handleSetNote} value={activeNote.body} />
            </form>
        )
    }
    return null;
}
