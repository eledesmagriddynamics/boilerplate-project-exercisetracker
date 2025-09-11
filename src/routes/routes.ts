import { RequestHandler, Router } from 'express';
import { UserController } from '../controllers/userController';
import { ExerciseController } from '../controllers/exerciseController';
import { checkUserExists } from '../middlewares/checkUserExists';
import { UserModel } from '../models/userModel';

export function createApiRoutes(
  userController: UserController,
  exerciseController: ExerciseController,
  userModel: UserModel,
) {
  const router = Router();

  router.post('/users', userController.createUser.bind(userController));
  router.get('/users', userController.getUsers.bind(userController));
  router.post(
    '/users/:_id/exercises',
    checkUserExists(userModel) as unknown as RequestHandler,
    exerciseController.createExercise.bind(exerciseController) as unknown as RequestHandler,
  );

  return router;
}
