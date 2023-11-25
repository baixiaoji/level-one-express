import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import {User} from "../handlers/user";


export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5)
}

export const comparePassword = (password:string, hash:string) => {
    return bcrypt.compare(password, hash)
}


export const genJWTToken = (user: any) => {
    const token = jwt.sign({
        id: user.id,
        user: user.username,
    }, process.env.JWT_SECRET as string)

    return token;
}
