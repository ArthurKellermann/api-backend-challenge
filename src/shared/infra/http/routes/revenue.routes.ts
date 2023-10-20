import { Router } from 'express';
import { DeleteRevenueController } from '../../../../modules/revenue/use-cases/delete-revenue/delete-revenue-controller';
import { CreateRevenueController } from '../../../../modules/revenue/use-cases/create-revenue/create-revenue-controller';
import { ListRevenuesController } from '../../../../modules/revenue/use-cases/list-revenues/list-revenues-controller';
import { UpdateRevenueController } from '../../../../modules/revenue/use-cases/update-revenue/update-revenue-controller';

const revenueRoutes = Router();

const createRevenueController = new CreateRevenueController();
const deleteRevenueController = new DeleteRevenueController();
const listRevenuesController = new ListRevenuesController();
const updateRevenueController = new UpdateRevenueController();

revenueRoutes.post('/create', createRevenueController.handle);
revenueRoutes.delete('/delete/:id', deleteRevenueController.handle);
revenueRoutes.get('/', listRevenuesController.handle);
revenueRoutes.put('/update', updateRevenueController.handle);

export { revenueRoutes };
