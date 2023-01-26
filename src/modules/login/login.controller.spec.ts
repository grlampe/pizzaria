import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/models/user';
import { LoginController } from './login.controller';

describe('LoginController', () => {
  let loginController: LoginController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [LoginController],
      providers: [],
    }).compile();

    loginController = app.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(loginController).toBeDefined();
  });

  it('should be able to generate a JWT', async () => {
    const user = new User({
      name: 'User Example',
      email: 'email@exampe.com',
      password: '$2a$08$si5hEyeYhFSZY3K425.d6ex0SXFBIu9RRR6oWb.l/YCYtYj.vBtXW',
    });

    const { access_token } = await loginController.login({ user });

    expect(access_token).toBeDefined();
  });
});
