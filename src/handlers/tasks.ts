import { RequestHandler } from "express";
import z from 'zod'
import prisma from "../db";



export const CreateTaskInput = z.object({
    title: z.string(),
    description: z.string()
})

type CreateTaskBody = z.infer<typeof CreateTaskInput>


export const createTask: RequestHandler<CreateTaskBody> = async (req, res) => {
    const task = await prisma.toDo.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            userId: req.user.id,
        },
    })

    res.status(201).json({
        todo: task,
    });
}

export const GetTaskInput = z.object({
    id: z.string()
})

type GetTaskParam = z.infer<typeof GetTaskInput>
export const getTask: RequestHandler<GetTaskParam> = async (req, res) => {
    const task = await prisma.toDo.findUnique({
        where: {id: req.params.id, userId: req.user.id },
    })
    if (!task) {
        res.status(404);
        res.send("没有Todo")
        return
    }

    res.status(200).json({
        todo: task,
    })
}
