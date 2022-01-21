import { useEffect, useReducer, useState } from 'react'

export default function useNotes() {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});
    
    const handleSetNotes = (data) => {
        setNotes(data.notes);
        if (!data.notes.length) {
            dispatch({ data: { title: "", body: "" }, type: "create" });
        } else if (state.action === "init" && !note.id) {
            setNote(data.notes[0]);
        }
    }

    const handleSetNote = (data) => {
        setNote(data.note);
    }

    const deleteNote = (data) => {

        if(data.id !== note.id) {
            dispatch({type: "init"});
            return;
        }

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
                    action: action.type,
                    method: "POST",
                    path: "/notes",
                    body: JSON.stringify(action.data),
                    callback: handleSetNote
                }
            case "update":
                return {
                    action: action.type,
                    method: "POST",
                    path: `/notes/${action.data.id}`,
                    body: JSON.stringify(action.data),
                    callback: handleSetNote
                }
            case "read":
                return {
                    action: action.type,
                    method: "GET",
                    path: `/notes/${action.data.id}`,
                    callback: handleSetNote
                }
            case "delete":
                return {
                    action: action.type,
                    method: "DELETE",
                    path: `/notes/${action.data.id}`,
                    callback: deleteNote
                }
            case "init":
                return {
                    action: action.type,
                    method: "GET",
                    path: "/notes",
                    callback: handleSetNotes
                }
            default:
                throw new Error("missing action type");
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        action: "init",
        method: "GET",
        path: "/notes",
        callback: handleSetNotes
    });
    
    useEffect(() => {
        function execute() {
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
                    state.callback(data)
                })
                .catch(error => console.error(error));
            return response;
        }
        execute();
    }, [state])

    useEffect(() => {
      dispatch({type: "init"});
    }, [note]);
    
    return [notes, note, dispatch]
}
