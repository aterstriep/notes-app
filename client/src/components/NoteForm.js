import React, { useEffect, useState } from 'react'
import useNotes from '../hooks/useNotes';

export default function NoteForm({ setNotes, activeNote = {title: "", body: ""}, action = "create" }) {

    const [note, setNote] = useState({});

    const titlePlaceholder = action === "create" ? "New Note" : "";
    const titleInput = document.getElementById("note_title") || "";

    const handleSetNote = (e) => {
        setNote({...note, [e.currentTarget.name]: e.currentTarget.value});
    }

    // Causes loop???
    useEffect(() => {
        setNote(activeNote);
    }, [activeNote])

    if(note) {
        return (
            <form>
                <div className="field-wrapper">
                    <input type="text" id="note_title" name="title" onChange={handleSetNote} value={note.title} placeholder={titlePlaceholder} />
                </div>
                <div className="field-wrapper">
                    <textarea id="note_body" name="body" rows="8" onChange={handleSetNote} value={note.body} />
                </div>
                {/* <input type="submit" value="Save Note" onClick={(e) => handleSaveNote(e, note)} /> */}
                <input type="submit" value="Save Note" onClick={(e) => setNotes(e, note, "update")} />
            </form>
        )
    }
    return null;
}
