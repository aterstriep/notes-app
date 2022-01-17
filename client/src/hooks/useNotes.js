import { useEffect, useReducer, useState } from 'react'

export default function useNotes() {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});
    
    const handleSetNote = (data) => {
        setNote(data.note);
    }

    const deleteNote = (data) => {
        const index = notes.findIndex(note => note.id === data.id);
        if(index >= notes.length - 1) {
            setNote(notes[0]);
        } else {
            setNote(notes[index + 1]);
        }
    }

    function reducer(state, action) {
        switch (action.type) {
            case "create":
                return {
                    action: "create",
                    method: "POST",
                    path: "/notes",
                    body: JSON.stringify(action.data),
                    callback: handleSetNote
                }
            case "update":
                return {
                    action: "update",
                    method: "POST",
                    path: `/notes/${action.data.id}`,
                    body: JSON.stringify(action.data),
                    callback: handleSetNote
                }
            case "read":
                return {
                    action: "read",
                    method: "GET",
                    path: `/notes/${action.data.id}`,
                    callback: handleSetNote
                }
            case "delete":
                return {
                    action: "delete",
                    method: "DELETE",
                    path: `/notes/${action.data.id}`,
                    callback: deleteNote
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

        if (!data.notes.length) {
            dispatch({ data: { title: "", body: "" }, type: "create" });
        } else if (!state.action && !note.id) {
            setNote(data.notes[0]);
        }

    }

    const execute = (state) => {
        state = state || {};
        let options = {
            method: state.method,
            headers: {
                "content-type": "application/json",
            },
        }
        options.body = state.body || null;

        const response = fetch(state.path || "/notes", options)
            .then(response => response.json())
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
        execute(state)
    }, [state])
    
    return [notes, note, dispatch]
}
