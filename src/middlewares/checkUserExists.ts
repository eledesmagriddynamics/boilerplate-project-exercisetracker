import { Response, NextFunction } from 'express';
import { UserModel } from '../models/userModel';
import { RequestWithUser } from '../interfaces/request';
import { AppError } from '../errors';

export const checkUserExists = (userModel: UserModel) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params._id);
      
      if (isNaN(userId) || userId <= 0) {
        throw new AppError('Invalid user ID', 400);
      }

      const user = await userModel.getUserById(userId);

      if (!user) {
        throw new AppError('User not found', 404);
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};