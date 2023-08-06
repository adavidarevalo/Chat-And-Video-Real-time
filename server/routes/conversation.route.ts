import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  createOpenConversation,
  getConversation,
} from '../controllers/conversation.controller';

const router = Router();

router.post('/', [authMiddleware], createOpenConversation);
router.get('/', [authMiddleware], getConversation);

export { router as conversationRoutes };
