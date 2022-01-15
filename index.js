import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use((req, res) => {
    res.status(404).send("404 | Not Found");
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
})

app.listen(3000, () => {
    console.log("app listening on port 3000");
});