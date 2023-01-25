import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { LoginController } from '../login/login.controller';

@Module({
  imports: [AuthModule],
  controllers: [LoginController],
  providers: [],
})
export class LoginModule {}
