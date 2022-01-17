import React, { useEffect, useReducer, useState } from 'react'

const initialNote = {title: "", body: ""}

export default function useNotes() {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(initialNote);
    
    const handleSetNote = (data) => {
        setNote(data.note);
    }

    const deleteNote = (data) => {
        console.log("note deleted");
    }

    function reducer(state, action) {
        switch (action.type) {
            case "create":
                action.data.title = action.data.title || "Untitled";
                return {
                    action: "create",
                    method: "POST",
                    path: "/notes",
                    body: JSON.stringify(action.data),
                    callback: handleSetNote
                }
                break;
            case "update":
                action.data.title = action.data.title || "Untitled";
                return {
                    action: "update",
                    method: "POST",
                    path: `/notes/${action.data.id}`,
                    body: JSON.stringify(action.data),
                    callback: handleSetNote
                }
                break;
            case "read":
                return {
                    action: "read",
                    method: "GET",
                    path: `/notes/${action.data.id}`,
                    callback: handleSetNote
                }
                break;
            case "delete":
                return {
                    action: "delete",
                    method: "DELETE",
                    path: `/notes/${action.data.id}`,
                    callback: deleteNote
                }
                break;
            case "reset":
                return {
                    action: "reset"
                }
            default:
                throw new Error("missing action type");
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        method: "GET",
        path: "/notes",
    });
    
    const handleSetNotes = (data) => {
        setNotes(data.notes);
    }

    const execute = (state) => {
        state = state || {};
        let options = {
            method: state.method || "GET",
            headers: {
                "content-type": "application/json",
            },
        }
        options.body = state.body || null;

        const response = fetch(`http://localhost:8000${state.path || "/notes"}`, options)
            .then(response => {
                if(state.action === "delete") {
                    return response
                } else {
                    return response.json()
                }
            })
            .then(data => {
                if(state.action) {
                    state.callback(data);
                    execute();
                } else {
                    handleSetNotes(data);
                }
            })
            .catch(error => console.error(error));
        return response;
    }

    useEffect(() => {
        if(state.action !== "reset") {
            execute(state)
        } else {
            setNote(initialNote);
        }
    }, [state])

    useEffect(() => {
        execute();
    }, [])
    
    return [notes, note, dispatch]
}
