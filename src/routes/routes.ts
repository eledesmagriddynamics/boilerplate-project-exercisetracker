import { RequestHandler, Router } from 'express';
import { UserController } from '../controllers/userController';
import { ExerciseController } from '../controllers/exerciseController';
import { checkUserExists } from '../middlewares/checkUserExists';
import { validateBody } from '../middlewares/validateBody';
import { validateQuery } from '../middlewares/validateQuery';
import { UserModel } from '../models/userModel';
import { exerciseLogQuerySchema, exerciseSchema, userSchema } from '../validations/schema';

export function createApiRoutes(
  userController: UserController,
  exerciseController: ExerciseController,
  userModel: UserModel,
) {
  const router = Router();

  router.post(
    '/users',
    validateBody(userSchema),
    userController.createUser.bind(userController),
  );
  router.get('/users', userController.getUsers.bind(userController));
  router.post(
    '/users/:_id/exercises',
    validateBody(exerciseSchema),
    checkUserExists(userModel) as unknown as RequestHandler,
    exerciseController.createExercise.bind(
      exerciseController,
    ) as unknown as RequestHandler,
  );
  router.get(
    '/users/:_id/logs',
    validateQuery(exerciseLogQuerySchema),
    checkUserExists(userModel) as unknown as RequestHandler,
    exerciseController.getUserExerciseLog.bind(
      exerciseController,
    ) as unknown as RequestHandler,
  );

  return router;
}
