import { Router } from 'express';
import { CreateUserController } from '../../../../modules/account/use-cases/create-user/create-user-controller';

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post('/', createUserController.handle);

export { userRoutes };
