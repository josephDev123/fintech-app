import { Module } from '@nestjs/common';
import { KycModule } from '../Kyc/kyc.module.js';
import { UserController } from './UserController.js';
import { UserRepository } from './UserRepository.js';
import { UserService } from './UserService.js';

@Module({
  imports: [KycModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
