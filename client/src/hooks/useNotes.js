import React, { useEffect, useReducer, useState } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case "create":
            return {
                loaded: true,
                method: "POST",
                path: "/notes",
                body: JSON.stringify(action.data),
            }
            break;
        case "update":
            return {
                loaded: true,
                method: "POST",
                path: `/notes/${action.data.id}`,
                body: JSON.stringify(action.data)
            }
            break;
        case "delete":
            return {
                loaded: true,
                method: "POST",
                path: "/notes",
                body: JSON.stringify(action.data)
            }
            break;
        case "init":
            return {
                loaded: true,
                method: "GET",
                path: "/notes",
            }
        default:
            throw new Error("missing action type");
    }
}

export default function useNotes() {

    const [notes, setNotes] = useState([]);
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
            .then(response => response.json())
            .then(data => {
                if(state.loaded) {
                    execute();
                } else {
                    handleSetNotes(data);
                }
            })
            .catch(error => console.error(error));
        return response;
    }

    useEffect(() => {
        if(state.loaded) {
            execute(state)
        }
    }, [state])

    useEffect(() => {
        execute();
    }, [])
    
    return [notes, dispatch]
}
