import { Router } from 'express';

export function createApiRoutes() {
  const router = Router();

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
