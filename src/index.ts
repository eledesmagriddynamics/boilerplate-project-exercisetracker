import express from 'express';
import cors from 'cors';
import path from 'path';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.static('public'));
app.get('/', (req: Request, res: Response) => {
  res.sendFile('views/index.html', { root: path.join(__dirname, '../') });
});

export default app;
