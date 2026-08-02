import { Controller, Post } from '@nestjs/common';
import { AuthService } from './AuthService.js';
import { successResponse } from '../../shared/http/api-response.js';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login() {
    return successResponse('Login successful', this.authService.login());
  }
}
