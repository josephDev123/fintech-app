import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './AuthService.js';
import { successResponse } from '../../shared/http/api-response.js';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { createUserSchema } from '../User/validation/create-user.validation.js';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(
    @Body(new ZodValidationPipe(createUserSchema)) body: unknown,
  ) {
    const user = await this.authService.register(body as never);

    return successResponse('User registered successfully', user);
  }

  @Post('login')
  login() {
    return successResponse('Login successful', {
      message: 'Login successful',
    });
  }
}
