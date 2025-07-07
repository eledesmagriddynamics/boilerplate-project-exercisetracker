import { Router } from 'express';
import { UserController } from '../controllers/userController';

export function createApiRoutes(
  userController: UserController
) {
  const router = Router();

  router.post('/users', userController.createUser.bind(userController));

  router.get('/users', (req, res) => {
    // Simulate fetching users from a database
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
    res.json(users);
  });

  return router;
}
