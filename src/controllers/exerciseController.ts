import { NextFunction, Response } from 'express';
import { ExerciseModel } from '../models';
import { formatDateToString } from '../utils/dateUtils';
import { RequestWithUser } from '../interfaces/request';
import { ExerciseResponse, UserExerciseLog, ExerciseLogQuery } from '../interfaces';

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

  async getUserExerciseLog(
    req: RequestWithUser,
    res: Response<UserExerciseLog>,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        throw new Error('User not found in request');
      }

      const user = req.user;
      const { from, to, limit } = req.query as ExerciseLogQuery;

      const [exercises, totalCount] = await Promise.all([
        this.exerciseModel.getUserExercises(user._id, { from, to, limit: Number(limit) }),
        this.exerciseModel.getUserExerciseCount(user._id, { from, to })
      ]);

      res.json({
        _id: user._id,
        username: user.username,
        count: totalCount,
        log: exercises
      });
    } catch (error) {
      next(error);
    }
  }
}
