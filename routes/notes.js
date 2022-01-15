import * as Note from "../model/note.js";

export const list = (req, res) => {
    let { sort } = req.query;
    sort = sort ? sort.toLowerCase() : "desc";
    if (!(sort === "asc" || sort === "desc")) {
        return res.status(400).send("Invalid sort Params");
    }
    const notes = Note.getNotes(sort);
    res.json({ notes });
}

export const create = async (req, res) => {
    const { title, body } = req.body;
    if (title === undefined || body === undefined) {
        return res.status(400).send("Missing title or body");
    }
    const note = await Note.createNote({ title, body });
    console.log({ note });
    res.send("ok");
}

export const read = (req, res) => {
    const { id } = req.params;
    const note = Note.getNote(id);
    res.json({ note });
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    if (title === undefined && body === undefined) {
        return res.status(400).send("Missing title and body");
    }
    const note = await Note.updateNote(id, { title, body });
    console.log({ note });
    res.send("ok");
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    const success = await Note.deleteNote(id);
    console.log(`deleting ${id}`, success);
    res.send("ok");
}