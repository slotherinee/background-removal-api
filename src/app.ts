import express from "express";
import path from "path";
import backgroundRoutes from "./routes/background.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
app.use("/api", backgroundRoutes);

export default app;
