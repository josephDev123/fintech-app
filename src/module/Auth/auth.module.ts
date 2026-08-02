import { Module } from '@nestjs/common';
import { AuthController } from './AuthController.js';
import { AuthService } from './AuthService.js';
import { AuthRepository } from './AuthRepository.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
