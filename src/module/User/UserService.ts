import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  Prisma,
  type Kyc,
  type User,
  type Wallet,
} from '../../lib/prisma/generated/client.js';
import { PrismaService } from '../../lib/prisma/prisma.service.js';
import { SUPPORTED_CURRENCIES } from '../../shared/constants/currencies.js';
import { errorResponse } from '../../shared/http/api-response.js';
import { hashPassword } from '../../shared/lib/password.js';
import { KycRepository } from '../Kyc/KycRepository.js';
import { mapUserProfile, type UserProfileView } from './mappers/user.mapper.js';
import { UserRepository } from './UserRepository.js';
import type { CreateUserDto } from './dto/create-user.dto.js';

type RegistrationResult = {
  user: User;
  kyc: Kyc;
  wallets: Wallet[];
};

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userRepository: UserRepository,
    private readonly kycRepository: KycRepository,
  ) {}

  async register(input: CreateUserDto): Promise<UserProfileView> {
    try {
      const passwordHash = await hashPassword(input.password);

      const result = await this.prisma.$transaction(async (database) => {
        const existingUser = await this.userRepository.findByEmail(
          input.email,
          database,
        );

        if (existingUser) {
          throw new ConflictException(
            errorResponse('Email already exists', 'USER_EMAIL_EXISTS', [
              'A user with this email already exists',
            ]),
          );
        }

        const user = await this.userRepository.createUser(database, {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          middleName: input.middleName,
          passwordHash: input.password,
        });

        const kyc = await this.kycRepository.createPending(database, user.id);
        const wallets = await this.userRepository.createWallets(
          database,
          user.id,
        );

        return {
          user,
          kyc,
          wallets,
        } satisfies RegistrationResult;
      });

      return mapUserProfile({
        ...result.user,
        wallets: result.wallets,
        kyc: result.kyc,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          errorResponse('Email already exists', 'USER_EMAIL_EXISTS'),
        );
      }

      throw error;
    }
  }

  async getProfile(id: string): Promise<UserProfileView> {
    const user = await this.userRepository.findById(this.prisma, id);

    if (!user) {
      throw new NotFoundException(
        errorResponse('User not found', 'USER_NOT_FOUND', [
          'No user exists for the provided identifier',
        ]),
      );
    }

    return mapUserProfile(user);
  }

  async listWallets(userId: string) {
    return this.userRepository.findWalletsByUserId(this.prisma, userId);
  }

  async ensureWalletsExist(userId: string) {
    const wallets = await this.listWallets(userId);

    if (wallets.length === SUPPORTED_CURRENCIES.length) {
      return wallets;
    }

    return this.prisma.$transaction(async (database) => {
      return this.userRepository.createWallets(database, userId);
    });
  }
}
