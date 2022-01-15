import React from 'react'

export default function Sidebar({ notes, activeNote, setActiveNote }) {

    return (
        <div id="sidebar">
            <div>
                <nav>
                    <h3 className="nav-header">Notes</h3>
                    <ul className="notes clearlist">
                        {notes.map(note => {
                            const active = note.id === activeNote.id ? "active" : "";  
                            return (
                                <li key={note.id} className={`sidebar-hoverable ${active}`} onClick={() => setActiveNote(note)}>{note.title}</li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )

}
