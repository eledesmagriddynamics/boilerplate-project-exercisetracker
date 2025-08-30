import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { ExerciseModel } from '../models';
import { exerciseSchema } from '../validations/schema';
import { ZodError } from 'zod';
import { formatDateToString } from '../utils/dateUtils';

export class ExerciseController {
  constructor(
    private exerciseModel: ExerciseModel,
    private userModel: UserModel,
  ) { }

  async createExercise(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params._id);
      const user = await this.userModel.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const exerciseData = exerciseSchema.parse(req.body);
      const newExercise = await this.exerciseModel.createExercise(
        userId,
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
