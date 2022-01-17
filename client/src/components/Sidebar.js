import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Sidebar({ notes, activeNote, setNotes}) {

    const [scrollTop, setScrollTop] = useState(0);

    const nav = document.getElementById("notes-nav");
    if(nav) {
        nav.addEventListener("scroll", () => {
            setScrollTop(nav.scrollTop);
        })
    }

    const Note = ({ note }) => {

        const currentClass = note.id === activeNote.id ? "current" : "";
        note.title = note.title || "Untitled Note";

        const Menu = () => {

            const [active, setActive] = useState(false);
            
            const openFlyout = (e) => {
                e.currentTarget.parentElement.parentElement.classList.add("active");
                document.getElementById("sidebar").classList.add("flyout-active");
                setActive(true);
                nav.firstElementChild.style.marginTop = `-${scrollTop}px`;
            }

            const closeFlyout = (e) => {
                e.currentTarget.parentElement.parentElement.classList.remove("active");
                document.getElementById("sidebar").classList.remove("flyout-active");
                setActive(false);
                nav.firstElementChild.style.marginTop = 0;
            }

            const handleSetNotes = (e, action) => {
                setNotes(action);
                closeFlyout(e);
                triggerMobileMenu("close");
                if(action.type === "create") {
                    nav.scrollTop = 0;
                }
            }

            const Flyout = () => {
                if(active) {
                    return (
                        <>
                        <div id="overlay" onClick={(e) => closeFlyout(e)}></div>
                        <ul className="flyout-menu clearlist">
                            <li onClick={(e) => handleSetNotes(e, { data: {title: `${note.title} copy`, body: note.body}, type: "create" })}>
                                <FontAwesomeIcon icon="clone" />
                                Duplicate Note
                            </li>
                            <li onClick={(e) => handleSetNotes(e, {data: note, type: "delete"})}>
                                <FontAwesomeIcon icon="trash-alt" />
                                Delete Note
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

    const triggerMobileMenu = (action) => {
        if(action === "close") {
            document.getElementById("mobile-menu").classList.remove("active");
        } else {
            document.getElementById("mobile-menu").classList.toggle("active");
        }
    }

    useEffect(() => {
        if(nav && (activeNote.title === "Untitled" && activeNote.body === "") ) {
            nav.scrollTop = 0;
        }
    }, [activeNote])

    return (
        <div id="sidebar">
            <button onClick={() => triggerMobileMenu()} id="menu-trigger"><FontAwesomeIcon icon="bars" /></button>
            <div id="mobile-menu">
                <h3 className="nav-header">
                    Notes
                    <button onClick={() => setNotes({ data: {title: "", body: ""}, type: "create" })}>
                        <FontAwesomeIcon icon="plus" />
                    </button>
                </h3>
                <nav id="notes-nav">
                    <ul className="notes clearlist">
                        {notes.map(note => {
                            return (
                                <Note key={note.id} note={note} />
                            )
                        })}
                    </ul>
                    
                </nav>
                <a id="credit" href="https://ashleyterstriep.com" target="blank" className="sidebar-hoverable">
                    <FontAwesomeIcon icon="heart" />
                    Created by Ashley Terstriep
                </a>
            </div>
        </div>
    )

}
