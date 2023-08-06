import { Router } from 'express';
import { authRoutes } from './auth.route';
import { conversationRoutes } from './conversation.route';
import { messageRouter } from './message.route';
import { userRoutes } from './user.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/conversation', conversationRoutes);
router.use('/message', messageRouter);
router.use('/user', userRoutes);

export default router;
