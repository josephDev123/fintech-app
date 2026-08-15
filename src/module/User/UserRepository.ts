import { Injectable } from '@nestjs/common';
import {
  Prisma,
  PrismaClient,
  Wallet,
} from '../../lib/prisma/generated/client.js';
import { PrismaService } from '../../lib/prisma/prisma.service.js';
import { type SupportedCurrency } from '../../shared/constants/currencies.js';
import { WalletRepository } from '../Wallet/walletRepository.js';

type DatabaseClient = PrismaService | PrismaClient | Prisma.TransactionClient;

@Injectable()
export class UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly walletRepository: WalletRepository,
  ) {}

  findByEmail(email: string, database: DatabaseClient = this.prisma) {
    return database.user.findUnique({
      where: {
        email,
      },
    });
  }

  findById(database: DatabaseClient, id: string) {
    return database.user.findUnique({
      where: {
        id,
      },
      include: {
        wallets: true,
        kyc: true,
      },
    });
  }

  createUser(
    database: DatabaseClient,
    data: {
      email: string;
      name: string;
      passwordHash: string;
    },
  ) {
    return database.user.create({
      data,
    });
  }

  createWallets(database: DatabaseClient, userId: string) {
    return this.walletRepository.createWallets(userId, database);
  }

  findWalletsByUserId(database: DatabaseClient, userId: string) {
    return this.walletRepository.findWalletsByUserId(userId);
  }

  upsertWalletBalance(
    userId: string,
    currency: SupportedCurrency,
    balance: bigint,
  ) {
    return this.walletRepository.upsertWalletBalance(userId, currency, balance);
  }
}
