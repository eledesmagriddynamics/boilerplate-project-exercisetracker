import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { ExerciseController } from '../controllers/exerciseController';

export function createApiRoutes(
  userController: UserController,
  exerciseController: ExerciseController
) {
  const router = Router();

  router.post('/users', userController.createUser.bind(userController));
  router.get('/users', userController.getUsers.bind(userController));
  router.post('/users/:_id/exercises', exerciseController.createExercise.bind(exerciseController));

  return router;
}
