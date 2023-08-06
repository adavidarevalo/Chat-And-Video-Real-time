import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { sendMessage, getMessage } from '../controllers/message.controller';

const router = Router();

router.post('/', [authMiddleware], sendMessage);
router.get('/:conversation_id', [authMiddleware], getMessage);

export { router as messageRouter };
