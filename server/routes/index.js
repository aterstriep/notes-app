import express from "express";
import * as notes from "./notes.js";
import path from "path";

const router = express.Router();

router.get("/notes", notes.list);
router.post("/notes", notes.create);
router.get("/notes/:id", notes.read);
router.post("/notes/:id", notes.update);
router.delete("/notes/:id", notes.deleteNote);

router.get("*", (req, res) => {
    res.sendFile(path.resolve("server", "../client/build", "index.html"));
})

export default router;