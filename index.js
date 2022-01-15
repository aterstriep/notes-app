import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(routes);

app.use((req, res) => {
    res.status(404).send("404 | Not Found");
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
})

app.listen(8000, () => {
    console.log("app listening on port 8000");
});