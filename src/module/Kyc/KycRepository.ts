import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, type Kyc } from '../../lib/prisma/generated/client.js';
import { PrismaService } from '../../lib/prisma/prisma.service.js';

type DatabaseClient = PrismaService | PrismaClient | Prisma.TransactionClient;

@Injectable()
export class KycRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByUserId(database: DatabaseClient, userId: string) {
    return database.kyc.findUnique({
      where: {
        userId,
      },
    });
  }

  createPending(
    database: DatabaseClient,
    userId: string,
    submittedData: Prisma.InputJsonValue | null = null,
  ) {
    return database.kyc.create({
      data: {
        userId,
        status: 'PENDING',
        submittedData: submittedData ?? undefined,
      },
    });
  }

  upsertPending(
    database: DatabaseClient,
    userId: string,
    submittedData: Prisma.InputJsonValue,
  ) {
    return database.kyc.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        status: 'PENDING',
        submittedData,
      },
      update: {
        status: 'PENDING',
        submittedData,
        reviewNote: null,
        reviewedAt: null,
      },
    });
  }

  review(
    database: DatabaseClient,
    userId: string,
    data: Pick<Kyc, 'status' | 'reviewNote'>,
  ) {
    return database.kyc.update({
      where: {
        userId,
      },
      data: {
        status: data.status,
        reviewNote: data.reviewNote,
        reviewedAt: new Date(),
      },
    });
  }
}
