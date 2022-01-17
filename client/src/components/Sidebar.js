import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Sidebar({ notes, activeNote, setNotes}) {

    const Note = ({ note }) => {

        const currentClass = note.id === activeNote.id ? "current" : "";

        const Menu = () => {

            const [active, setActive] = useState(false);
            
            const openFlyout = (e) => {
                e.currentTarget.parentElement.parentElement.classList.add("active");
                document.getElementById("sidebar").classList.add("flyout-active");
                setActive(true);
            }

            const closeFlyout = (e) => {
                e.currentTarget.parentElement.parentElement.classList.remove("active");
                document.getElementById("sidebar").classList.remove("flyout-active");
                setActive(false);
            }

            const handleSetNotes = (e, data) => {
                setNotes(data);
                closeFlyout(e);
            }

            const Flyout = () => {
                if(active) {
                    return (
                        <>
                        <div id="overlay" onClick={(e) => closeFlyout(e)}></div>
                        <ul className="flyout-menu clearlist">
                            <li onClick={(e) => handleSetNotes(e, {data: note, type: "delete"})}>
                                <FontAwesomeIcon icon="trash-alt" />
                                Delete Note
                            </li>
                            <li onClick={(e) => handleSetNotes(e, {data: note, type: "create"})}>
                                <FontAwesomeIcon icon="clone" />
                                Duplicate Note
                            </li>
                        </ul>
                        </>
                    )
                }
                return null;
            }

            return (
                <div className="note-actions">
                    <FontAwesomeIcon icon="ellipsis-h" onClick={(e) => openFlyout(e)} />
                    <Flyout />
                </div>
            )
        }
        
        return (
            <li
                className={`sidebar-hoverable ${currentClass}`}
            >
                <span onClick={() => setNotes({ data: note, type: "read" })}>{note.title}</span>
                <Menu />
            </li>
        )
    }

    return (
        <div id="sidebar">
            <div>
                <nav>
                    <h3 className="nav-header">
                        Notes
                        <button onClick={() => setNotes({type: "reset"})}>
                            <FontAwesomeIcon icon="plus" />
                        </button>
                    </h3>
                    
                    <ul className="notes clearlist">
                        {notes.map(note => {
                            return (
                                <Note key={note.id} note={note} />
                            )
                        })}
                    </ul>
                    
                </nav>
            </div>
        </div>
    )

}
