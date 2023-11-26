import express, { Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.route';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
