import {RequestHandler} from "express";
import z from 'zod'
import prisma from "../db";
import {comparePassword, genJWTToken, hashPassword} from "../modules/auth";

export const UserInput = z.object({
    username: z.string(),
    password: z.string()
})
export type User = z.infer<typeof UserInput>

export const createUser: RequestHandler<User> = async (req, res) => {
    const { username, password } = req.body;

    const hash = await hashPassword(password)

    const user = await prisma.user.create({
        data: {
            username,
            password: hash
        }
    })

    const token = genJWTToken(user)


    res.status(200).json({
        token,
    })
}

export const userSignIn: RequestHandler<User> = async (req, res) => {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
        where: { username }
    })

    if (!user) {
        res.status(500)
        res.send('用户和密码无效')
        return
    }

    const isValid = await comparePassword(password, user.password)

    if (!isValid) {
        res.status(401)
        res.send('用户和密码无效')
        return
    }

    const token = genJWTToken(user)

    res.status(200).json({
        token
    })
}
