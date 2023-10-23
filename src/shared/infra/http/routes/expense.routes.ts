import { Router } from 'express';
import { CreateExpenseController } from '../../../../modules/expense/use-cases/create-expense/create-expense-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated-middleware';
import { ListExpensesController } from '../../../../modules/expense/use-cases/list-expenses/list-expenses-controller';
import { DeleteExpenseController } from '../../../../modules/expense/use-cases/delete-expense/delete-expense-controller';
import { UpdateExpenseController } from '../../../../modules/expense/use-cases/update-expense/update-expense-controller';

const expenseRoutes = Router();

const createExpenseController = new CreateExpenseController();
const listExpensesController = new ListExpensesController();
const deleteExpenseController = new DeleteExpenseController();
const updateExpenseController = new UpdateExpenseController();

expenseRoutes.post('/', ensureAuthenticated, createExpenseController.handle);
expenseRoutes.get('/', ensureAuthenticated, listExpensesController.handle);
expenseRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteExpenseController.handle,
);
expenseRoutes.put('/:id', ensureAuthenticated, updateExpenseController.handle);

export { expenseRoutes };
