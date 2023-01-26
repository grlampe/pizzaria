import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-userRepository';
import { User } from '../../user/models/user';
import { UserRepository } from '../../user/repositories/user.repository';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;
  const userRepository: InMemoryUserRepository =
    InMemoryUserRepository.getInstance();
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [
        JwtStrategy,
        LocalStrategy,
        AuthService,
        JwtService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
      ],
    }).compile();

    localStrategy = app.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it('should be validate a User with success', async () => {
    const newUser = new User({
      name: 'user',
      email: 'user@user.com',
      password: 'random',
    });

    await userRepository.create(newUser);

    const validateUser = await localStrategy.validate(
      newUser.email,
      newUser.password,
    );

    expect(validateUser).toEqual(newUser);
  });
});
