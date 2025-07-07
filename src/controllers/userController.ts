import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { userSchema } from '../validations/schema';

export class UserController {
  constructor(private userModel: UserModel) {}
}