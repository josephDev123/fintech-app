import { Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './AuthService.js';
import { successResponse } from '../../shared/http/api-response.js';
import { AuthLoginResponseDto } from '../../docs/swagger.models.js';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiCreatedResponse({
    type: AuthLoginResponseDto,
  })
  login() {
    return successResponse('Login successful', this.authService.login());
  }
}
