import { Router } from 'express';
import { login, logout, refreshToken, register } from '../controllers/auth.controller';

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refreshToken", refreshToken)

export { router as authRoutes };
