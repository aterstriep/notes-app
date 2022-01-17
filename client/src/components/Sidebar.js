import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Sidebar({ notes, activeNote, setNotes}) {

    return (
        <div id="sidebar">
            <div>
                <nav>
                    <h3 className="nav-header">Notes <button onClick={() => setNotes({type: "reset"})}><FontAwesomeIcon icon="plus" /></button></h3>
                    <ul className="notes clearlist">
                        {notes.map(note => {
                            const active = note.id === activeNote.id ? "active" : "";  
                            return (
                                <li key={note.id} className={`sidebar-hoverable ${active}`} onClick={() => setNotes({ data: note, type: "read" })}>{note.title}</li>
                            )
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    )

}
