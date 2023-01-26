import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-userRepository';
import { User } from '../models/user';
import { CreateUserService } from './createUser.service';

describe('Create User Service', () => {
  it('should be able to create a User', async () => {
    const userRepository = InMemoryUserRepository.getInstance();
    const createUserService = new CreateUserService(userRepository);

    const { user } = await createUserService.execute({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });

  it('should not be able to create a User with the same email', async () => {
    const userRepository = InMemoryUserRepository.getInstance();
    const createUserService = new CreateUserService(userRepository);

    const user = new User({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    await userRepository.create(user);

    expect(async () => {
      await createUserService.execute({
        name: 'User Name',
        email: 'user@example.com',
        password: 'test pass',
      });
    }).rejects.toThrowError('User Already Exists!');
  });
});
