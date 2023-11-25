import {Router} from "express";
import {createUser, UserInput, userSignIn} from "../handlers/user";
import {validateRequest, validateRequestBody} from "zod-express-middleware";


const router = Router()

router.post('/registry', validateRequestBody(UserInput), createUser)

router.post('/login', validateRequest({
    body: UserInput
}), userSignIn)

export default router
