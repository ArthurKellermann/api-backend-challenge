import { Router } from 'express';
import { userRoutes } from './user.routes';
import { revenueRoutes } from './revenue.routes';
import { expenseRoutes } from './expense.routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/revenue', revenueRoutes);
router.use('/expense', expenseRoutes);

export { router };
