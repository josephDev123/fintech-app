import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service.js';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(userId: string) {
    try {
    } catch (error) {}
  }
}
