import { Router } from "express";
import {createTask, CreateTaskInput, getTask, GetTaskInput} from '../handlers/tasks'
import { validateRequestBody, validateRequestParams } from "zod-express-middleware";

const router = Router();

router.post("/", validateRequestBody(CreateTaskInput), createTask);

router.get('/:id', validateRequestParams(GetTaskInput), getTask)

export default router;
