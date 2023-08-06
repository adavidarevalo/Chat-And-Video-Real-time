import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { searchUsers } from '../controllers/users.controller';

const router = Router();

router.get('/', [authMiddleware], searchUsers);

export { router as userRoutes };
