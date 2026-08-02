import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './AuthService.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create() {
    return this.authService.create();
  }

  @Post('login')
  login() {
    return { message: 'Login successful' };
  }
}
