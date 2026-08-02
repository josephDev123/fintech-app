import { Injectable } from '@nestjs/common';
import {
  Currency,
  Prisma,
  PrismaClient,
  Wallet,
  type User,
} from '../../lib/prisma/generated/client.js';
import { PrismaService } from '../../lib/prisma/prisma.service.js';
import { SUPPORTED_CURRENCIES, type SupportedCurrency } from '../../shared/constants/currencies.js';

type DatabaseClient = PrismaService | PrismaClient | Prisma.TransactionClient;

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

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
    data: Pick<User, 'email' | 'name'>,
  ) {
    return database.user.create({
      data,
    });
  }

  createWallets(database: DatabaseClient, userId: string) {
    return Promise.all(
      SUPPORTED_CURRENCIES.map((currency) =>
        database.wallet.create({
          data: {
            userId,
            currency: currency as Currency,
            balance: 0n,
          },
        }),
      ),
    );
  }

  findWalletsByUserId(database: DatabaseClient, userId: string) {
    return database.wallet.findMany({
      where: {
        userId,
      },
      orderBy: {
        currency: 'asc',
      },
    });
  }

  upsertWalletBalance(
    database: DatabaseClient,
    userId: string,
    currency: SupportedCurrency,
    balance: bigint,
  ) {
    return database.wallet.upsert({
      where: {
        userId_currency: {
          userId,
          currency: currency as Currency,
        },
      },
      create: {
        userId,
        currency: currency as Currency,
        balance,
      },
      update: {
        balance,
      },
    });
  }
}
