import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-userRepository';
import { CreateUserService } from './createUser.service';

describe('Create User Service', () => {
  it('should be able to create a User', async () => {
    const userRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(userRepository);

    const { user } = await createUserService.execute({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0]).toEqual(user);
  });
});
