import express from "express";
import { connectToDatabase } from "./services/database.service"
import { tasksRouter } from "./routers/tasks.router";
const app = express();
const port = 8080; // default port to listen

connectToDatabase()
    .then(() => {
        app.use("/tasks", tasksRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });