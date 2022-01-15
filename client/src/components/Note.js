import React, { useEffect, useState } from 'react'
import NoteForm from './NoteForm';

export default function Note({ activeNote }) {
    return (
        <NoteForm activeNote={activeNote} action="update" />
    )
}
