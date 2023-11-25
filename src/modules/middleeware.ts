import {RequestHandler} from "express";
import jwt from "jsonwebtoken";

export const protect: RequestHandler = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401)
        res.send("请登录授权")
        return
    }

    const [_, token] = bearer.split(" ");

    if (!token) {
        res.status(401)
        res.send("请登录授权")
        return
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = payload
        next()
    } catch (e) {
        res.status(401)
        res.send("请登录授权")
        return;
    }

}
