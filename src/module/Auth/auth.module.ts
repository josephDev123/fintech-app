import { Module } from '@nestjs/common';
import { AuthController } from './AuthController.js';
import { AuthService } from './AuthService.js';
import { UserModule } from '../User/user.module.js';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
