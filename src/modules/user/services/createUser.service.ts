import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { User } from '../models/user';
import { UserRepository } from '../repositories/user.repository';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, password } = request;

    const findUser = await this.userRepository.findByEmail(email);

    if (findUser) {
      throw new BadRequestException('User Already Exists!');
    }

    const user = new User({
      name,
      email,
      password: await hash(password, 8),
    });

    await this.userRepository.create(user);

    return {
      user,
    };
  }
}
