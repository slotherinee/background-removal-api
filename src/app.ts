import express from "express";
import backgroundRoutes from "./routes/background.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", backgroundRoutes);

export default app;
