import { Router } from 'express';
import { DeleteRevenueController } from '../../../../modules/revenue/use-cases/delete-revenue/delete-revenue-controller';
import { CreateRevenueController } from '../../../../modules/revenue/use-cases/create-revenue/create-revenue-controller';
import { ListRevenuesController } from '../../../../modules/revenue/use-cases/list-revenues/list-revenues-controller';
import { UpdateRevenueController } from '../../../../modules/revenue/use-cases/update-revenue/update-revenue-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated-middleware';

const revenueRoutes = Router();

const createRevenueController = new CreateRevenueController();
const deleteRevenueController = new DeleteRevenueController();
const listRevenuesController = new ListRevenuesController();
const updateRevenueController = new UpdateRevenueController();

revenueRoutes.post('/', ensureAuthenticated, createRevenueController.handle);
revenueRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteRevenueController.handle,
);
revenueRoutes.get('/', ensureAuthenticated, listRevenuesController.handle);
revenueRoutes.put('/:id', ensureAuthenticated, updateRevenueController.handle);

export { revenueRoutes };
