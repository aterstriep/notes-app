import React, { useEffect, useState } from 'react'

export default function NoteForm({ saveNote, activeNote = {title: "nope", body: ""}, action = "create" }) {

    const [note, setNote] = useState(activeNote);

    const titlePlaceholder = action === "create" ? "New Note" : "";
    const titleInput = document.getElementById("note_title") || "";

    // if(titleInput) {
    //     titleInput.focus();
    // }

    const handleSetNote = (e) => {
        setNote({...note, [e.currentTarget.name]: e.currentTarget.value});
    }

    const handleSaveNote = (e, note) => {
        setNote(activeNote);
        saveNote(e, note);
    }

    const Label = ({ name }) => {
        if(action === "create") {
            return <label htmlFor={name}>{name}</label>
        }
        return null;
    }

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
            </form>
        )
    }
    return null;
}
