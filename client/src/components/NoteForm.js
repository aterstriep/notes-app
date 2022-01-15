import React, { useState } from 'react'

export default function NoteForm() {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const handleSetNote = (e) => {
        setNote({...note, [e.currentTarget.name]: e.currentTarget.value});
    }

    const saveNote = (e) => {
        // const newNote = {
        //     title: "hello",
        //     body: "world"
        // }
        // fetch("/notes", {
        //     method: "POST",
        //     body: JSON.stringify(newNote)
        // })
        // .then(response => response.json())
        // .then(data => console.log(data));
        e.preventDefault();
        console.log(note);
    }

    return (
        <form>
            <div className="field-wrapper">
                <label htmlFor="title">Title</label>
                <input type="text" id="note_title" name="title" onChange={handleSetNote} value={note.title} />
            </div>
            <div className="field-wrapper">
                <label htmlFor="content">Content</label>
                <textarea id="note_content" name="content" rows="8" onChange={handleSetNote} value={note.content} />
            </div>
            <input type="submit" value="Save Note" onClick={saveNote} />
        </form>
    )
}
