import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-userRepository';
import { UserRepository } from './repositories/user.repository';
import { CreateUserService } from './services/createUser.service';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  const repository: InMemoryUserRepository =
    InMemoryUserRepository.getInstance();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: repository,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should be to create a User', async () => {
    const { user } = await userController.create({
      name: 'User Test',
      email: 'email@test.com',
      password: 'test',
    });

    expect(user).toBeTruthy();
    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('User Test');
    expect(user.createdAt).toEqual(expect.any(Date));
  });
});
