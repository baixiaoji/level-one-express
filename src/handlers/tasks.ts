import { RequestHandler } from "express";
import z from 'zod'
import { Task } from "../models/tasks";
import {TASKS_DB} from "../local_db/tasks";



export const CreateTaskInput = z.object({
    title: z.string(),
    description: z.string()
})

type CreateTaskBody = z.infer<typeof CreateTaskInput>


export const createTask: RequestHandler<CreateTaskBody> = (req, res) => {
    const task: Task = {
      id: TASKS_DB.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };

    TASKS_DB.push(task);

    res.status(201).json(task);
}

export const GetTaskInput = z.object({
    id: z.string()
})

type GetTaskParam = z.infer<typeof GetTaskInput>
export const getTask: RequestHandler<GetTaskParam> = (req, res) => {
    const id = Number(req.params.id)
    const item = TASKS_DB[id - 1]

    res.status(200).json(item)
}
