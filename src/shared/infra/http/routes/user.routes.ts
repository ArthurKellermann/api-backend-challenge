import { Router } from 'express';
import { CreateUserController } from '../../../../modules/account/use-cases/create-user/create-user-controller';
import { GetUserBalanceController } from '../../../../modules/account/use-cases/get-user-balance/get-user-balance-controller';
import { AuthenticateUserController } from '../../../../modules/account/use-cases/authenticate-user/authenticate-user-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated-middleware';

const userRoutes = Router();

const createUserController = new CreateUserController();
const getUserBalanceController = new GetUserBalanceController();
const authenticateUserController = new AuthenticateUserController();

userRoutes.post('/register', createUserController.handle);
userRoutes.get(
  '/balance',
  ensureAuthenticated,
  getUserBalanceController.handle,
);
userRoutes.post('/auth', authenticateUserController.handle);

export { userRoutes };
