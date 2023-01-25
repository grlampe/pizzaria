import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from './dto/createUserBody';
import { CreateUserService } from './services/createUser.service';
import { UserViewModel } from './view-models/user-view.model';

@Controller('user')
export class UserController {
  constructor(private readonly createService: CreateUserService) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password, fullAddress } = body;

    const { user } = await this.createService.execute({
      name,
      email,
      password,
      fullAddress,
    });

    return {
      user: UserViewModel.toHTTP(user),
    };
  }
}
