import { Router } from 'express';
import { CreateUserController } from '../../../../modules/account/use-cases/create-user/create-user-controller';
import { GetUserBalanceController } from '../../../../modules/account/use-cases/get-user-balance/get-user-balance-controller';

const userRoutes = Router();

const createUserController = new CreateUserController();
const getUserBalanceController = new GetUserBalanceController();

userRoutes.post('/register', createUserController.handle);
userRoutes.get('/balance/:id', getUserBalanceController.handle);

export { userRoutes };
