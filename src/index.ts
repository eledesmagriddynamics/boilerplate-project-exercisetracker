import express from 'express';
import cors from 'cors';
import path from 'path';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createApiRoutes } from './routes/routes'
dotenv.config();
import { UserController } from './controllers/userController';
import { UserModel } from './models/userModel';
import { initializeDB, runMigrations } from './database/db';

const app = express();

const init = async () => {
  console.log('Initializing the app...');
  const db = await initializeDB();
  runMigrations(db);

  const userModel = new UserModel(db);
  const userController = new UserController(userModel);

  app.use(cors());
  app.use(express.static('public'));
  app.get('/', (req: Request, res: Response) => {
    res.sendFile('views/index.html', { root: path.join(__dirname, '../') });
  });
  app.use('/api', createApiRoutes(userController));
};

init().catch((err) => {
  console.error('Error initializing the app:', err);
});

export default app;
