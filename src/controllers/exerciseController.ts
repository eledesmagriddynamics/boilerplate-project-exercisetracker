import { NextFunction, Response } from 'express';
import { ExerciseModel } from '../models';
import { formatDateToString } from '../utils/dateUtils';
import { RequestWithUser } from '../interfaces/request';

export class ExerciseController {
  constructor(
    private exerciseModel: ExerciseModel,
  ) { }

  async createExercise(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.user) {  // Ensure user is defined by middleware
        throw new Error('User not found in request');
      }

      const user = req.user;
      const exerciseData = req.body;
      const newExercise = await this.exerciseModel.createExercise(
        user._id,
        exerciseData,
      );
      const { description, duration, date } = newExercise;

      res.status(201).json({
        username: user.username,
        description,
        duration,
        date: formatDateToString(date),
        _id: user._id,
      });
    } catch (error) {
      next(error);
    }
  }
}
