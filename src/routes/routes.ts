import { Router } from 'express';
import { UserController } from '../controllers/userController';

export function createApiRoutes(
  userController: UserController
) {
  const router = Router();

  router.post('/users', userController.createUser.bind(userController));
  router.get('/users', userController.getUsers.bind(userController));

  return router;
}
