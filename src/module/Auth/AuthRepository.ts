import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '../../lib/prisma/generated/client.js';
import { PrismaService } from '../../lib/prisma/prisma.service.js';

type DatabaseClient = PrismaService | PrismaClient | Prisma.TransactionClient;

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string, database: DatabaseClient = this.prisma) {
    return database.user.findUnique({
      where: {
        email,
      },
      include: {
        wallets: true,
        kyc: true,
      },
    });
  }
}
