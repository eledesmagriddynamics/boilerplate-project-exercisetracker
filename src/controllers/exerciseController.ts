import { Response } from 'express';
import { ZodError } from 'zod';
import { ExerciseModel } from '../models';
import { formatDateToString } from '../utils/dateUtils';
import { RequestWithUser } from '../interfaces/request';

export class ExerciseController {
  constructor(
    private exerciseModel: ExerciseModel,
  ) { }

  async createExercise(req: RequestWithUser, res: Response) {
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
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.issues });
        return;
      }
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  }
}
