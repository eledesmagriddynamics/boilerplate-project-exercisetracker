import { Response, NextFunction } from 'express';
import { UserModel } from '../models/userModel';
import { RequestWithUser } from '../interfaces/request';

export const checkUserExists = (userModel: UserModel) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.params._id);
      
      if (isNaN(userId) || userId <= 0) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = await userModel.getUserById(userId);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};