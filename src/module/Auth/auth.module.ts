import { Module } from '@nestjs/common';
import { AuthController } from './AuthController.js';
import { AuthService } from './AuthService.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
