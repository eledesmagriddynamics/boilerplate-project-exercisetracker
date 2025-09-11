import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/userModel';

export class UserController {
  constructor(private userModel: UserModel) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;
      const user = await this.userModel.createUser(username);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
}