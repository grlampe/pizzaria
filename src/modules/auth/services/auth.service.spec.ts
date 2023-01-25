import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { hashSync } from 'bcryptjs';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-userRepository';
import { User } from '../../user/models/user';
import { UserRepository } from '../../user/repositories/user.repository';
import { UserModule } from '../../user/user.module';
import { jwtConstants } from '../constants';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

let service: AuthService;
describe('validateUser', () => {
  const repository: InMemoryUserRepository =
    InMemoryUserRepository.getInstance();
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: UserRepository,
          useValue: repository,
        },
      ],
    }).compile();
    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return a user object when credentials are valid', async () => {
    const user = new User({
      name: 'User Name',
      email: 'user@example.com',
      password: 'test pass',
    });

    await repository.create(user);

    const res = await service.validateUser(user.email, 'test pass');

    expect(res._id).toEqual(user.id);
  });

  it('should return null when credentials are invalid', async () => {
    const res = await service.validateUser('xxx', 'xxx');
    expect(res).toBeNull();
  });
});

describe('validateLogin', () => {
  let service: AuthService;
  let repository: InMemoryUserRepository;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();
    repository = moduleRef.get(UserRepository);
    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return JWT object when credentials are valid', async () => {
    const user: User = new User({
      name: 'User Name',
      email: 'user@example.com',
      password: hashSync('test pass', 8),
    });

    await repository.create(user);

    const res = await service.login(user);

    expect(res.access_token).toBeDefined();
  });
});
