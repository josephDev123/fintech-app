import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service.js';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    return await this.prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john.doe@example.com',
      },
    });
  }

  find() {
    return 'Hello greeting from AuthRepository!';
  }
}
