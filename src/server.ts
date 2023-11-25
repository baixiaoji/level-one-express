import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import taskRouter from './routes/tasks'

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/task', taskRouter)

app.get('/:id', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


export default app
