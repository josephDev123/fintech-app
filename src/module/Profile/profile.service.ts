import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository.js';

@Injectable()
export class ProfileService {
  constructor(private readonly ProfileRepository: ProfileRepository) {}

  async getProfile(userId: string | undefined) {
    try {
      if (!userId) {
        throw new UnauthorizedException('User authentication is required');
      }
      const result = await this.ProfileRepository.getProfile(userId);
      return result;
    } catch (error) {}
  }
}
