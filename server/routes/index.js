import express from 'express';
import authRoutes from './auth.routes';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to forsetti-ah-backend API' });
});

export default router;
