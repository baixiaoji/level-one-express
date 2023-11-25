import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import taskRouter from './routes/tasks'
import userRouter from './routes/user'

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter)
app.use('/task', taskRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


export default app
