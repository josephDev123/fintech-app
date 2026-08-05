import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './module/Auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './lib/prisma/prisma.module.js';
import { Envalidate } from './config/validate-env.js';
import { KycModule } from './module/Kyc/kyc.module.js';
import { UserModule } from './module/User/user.module.js';
import { WalletModule } from './module/Wallet/wallet.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: Envalidate,
    }),
    PrismaModule,
    KycModule,
    UserModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
