import express from "express";
import * as notes from "./notes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

app.use(express.static(path.resolve(__dirname, "../client/build")));

router.get("/notes", notes.list);
router.post("/notes", notes.create);
router.get("/notes/:id", notes.read);
router.post("/notes/:id", notes.update);
router.delete("/notes/:id", notes.deleteNote);

router.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
})

export default router;