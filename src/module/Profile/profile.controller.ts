import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import type { Request } from 'express';
import { successResponse } from 'src/shared/http/api-response.js';

@Controller('api/v1/users/profile')
export class ProfileController {
  constructor(private readonly ProfileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: Request) {
    const userId = req.user?.sub;
    const profile = await this.ProfileService.getProfile(userId);

    return successResponse('User profile fetched successfully', userId);
  }
}
