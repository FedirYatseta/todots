// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Task from "../models/task";


// Global Config
export const tasksRouter = express.Router();
tasksRouter.use(express.json());


// GET
tasksRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const tasks = (await collections?.tasks?.find({}).toArray()) as unknown as Task[];

        res.status(200).send(tasks);
    } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
            res.status(500).send(errorMessage);
        }

    }
});

tasksRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const game = (await collections?.tasks?.findOne(query)) as unknown as Task;

        if (game) {
            res.status(200).send(game);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

// POST

tasksRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newTask = req.body as Task;
        const result = await collections?.tasks?.insertOne(newTask);

        result
            ? res.status(201).send(`Successfully created a new task with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch (error) {
        console.error(error);
        let errorMessage = "POST - Failed to do something exceptional";
        if (error instanceof Error) {
            errorMessage = error.message;
            res.status(400).send(errorMessage);
        }
    }
});

// PUT
tasksRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedTasks: Task = req.body as Task;
        const query = { _id: new ObjectId(id) };

        const result = await collections?.tasks?.updateOne(query, { $set: updatedTasks });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        let errorMessage = " PUT - Failed to do something exceptional";
        if (error instanceof Error) {
            console.error(error.message);
            errorMessage = error.message;
            res.status(400).send(errorMessage);
        }
    }
});

// DELETE

tasksRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections?.tasks?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {

        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
            console.error(error.message);
            errorMessage = error.message;
            res.status(400).send(errorMessage);
        }
    }
});