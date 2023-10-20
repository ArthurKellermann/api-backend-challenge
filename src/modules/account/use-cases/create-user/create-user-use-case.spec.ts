import 'reflect-metadata';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { CreateUserUseCase } from './create-user-use-case';

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Create user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'jhondoe@mail.com',
      password: 'johndoe123',
      balance: 2500.0,
    });

    expect(user).toBeTruthy;
    expect(user).toHaveProperty('id');
  });
});
