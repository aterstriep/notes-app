import { useEffect, useReducer, useState } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case "create":
            return {
                action: action.type,
                method: "POST",
                path: "/notes",
                body: JSON.stringify(action.data),
            }
        case "update":
            return {
                action: action.type,
                method: "POST",
                path: `/notes/${action.data.id}`,
                body: JSON.stringify(action.data),
            }
        case "read":
            return {
                action: action.type,
                method: "GET",
                path: `/notes/${action.data.id}`,
            }
        case "delete":
            return {
                action: action.type,
                method: "DELETE",
                path: `/notes/${action.data.id}`,
            }
        case "init":
            return {
                action: action.type,
                method: "GET",
                path: "/notes",
            }
        default:
            throw new Error("missing action type");
    }
}

export default function useNotes() {

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({});

    const [state, dispatch] = useReducer(reducer, {
        action: "init",
        method: "GET",
        path: "/notes",
    });

    function handleSetNotes(data) {
        setNotes(data.notes);
        if (!data.notes.length) {
            dispatch({ data: { title: "", body: "" }, type: "create" });
        } else if (state.action === "init" && !note.id) {
            setNote(data.notes[0]);
        }
    }

    function deleteNote(data) {
        if(data.id !== note.id) {
            return;
        }
        const index = notes.findIndex(note => note.id === data.id);
        if(index >= notes.length - 1) {
            setNote(notes[0]);
        } else {
            setNote(notes[index + 1]);
        }
    }

    async function execute() {
        let options = {
            method: state.method,
            headers: {
                "content-type": "application/json",
            },
        }
        options.body = state.body || null;
        const response = await fetch(state.path || "/notes", options)
        return await response.json();
    }
    
    useEffect(() => {
        execute() 
            .then(response => {
                if(["read", "update", "create"].includes(state.action)) {
                    setNote(response.note);
                    dispatch({type: "init"});
                } else if (state.action === "delete") {
                    deleteNote(response);
                    dispatch({type: "init"});
                } else {
                    handleSetNotes(response);
                }
            })
            .catch(error => console.log(error));
    }, [state])
    
    return [notes, note, dispatch]
}
