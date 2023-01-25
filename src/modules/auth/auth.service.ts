import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findByEmail(username);

    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.props.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
