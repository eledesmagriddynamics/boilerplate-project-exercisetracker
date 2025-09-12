import { NextFunction, Response } from 'express';
import { ExerciseModel } from '../models';
import { formatDateToString } from '../utils/dateUtils';
import { RequestWithUser } from '../interfaces/request';
import { ExerciseResponse } from '../interfaces';

export class ExerciseController {
  constructor(private exerciseModel: ExerciseModel) {}

  async createExercise(
    req: RequestWithUser,
    res: Response<ExerciseResponse>,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        // Ensure user is defined by middleware
        throw new Error('User not found in request');
      }

      const user = req.user;
      const exerciseData = req.body;
      const newExercise = await this.exerciseModel.createExercise(
        user._id,
        exerciseData,
      );

      const { id, user_id, description, duration, date } = newExercise;

      res.status(201).json({
        userId: user_id,
        exerciseId: id,
        duration,
        description,
        date: formatDateToString(date),
      });
    } catch (error) {
      next(error);
    }
  }
}
