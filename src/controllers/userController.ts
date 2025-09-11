import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';

export class UserController {
  constructor(private userModel: UserModel) {}

  async createUser(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const user = await this.userModel.createUser(username);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
  }

  async getUsers(req: Request, res: Response) {
    const users = await this.userModel.getAllUsers();
    res.json(users);
  }
}