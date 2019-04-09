import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import articleRoutes from './article.routes';
import reportRoutes from './report.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/article', articleRoutes);
router.use('/reports', reportRoutes);

router.use('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to forsetti-ah-backend API' });
});

export default router;
