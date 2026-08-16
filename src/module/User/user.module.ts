import { Module } from '@nestjs/common';
import { KycModule } from '../Kyc/kyc.module.js';
import { ProfileModule } from '../Profile/profile.module.js';
import { UserController } from './UserController.js';
import { UserRepository } from './UserRepository.js';
import { UserService } from './UserService.js';
import { WalletRepository } from '../Wallet/walletRepository.js';

@Module({
  imports: [KycModule, ProfileModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, WalletRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
