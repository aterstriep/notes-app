import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use(express.static(path.resolve("server", "../client/build")));

app.use(routes);

app.use((req, res) => {
    res.status(404).send("404 | Not Found");
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});