import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { successResponse } from '../../shared/http/api-response.js';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { UserService } from './UserService.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { createUserSchema } from './schema/createUserSchema.js';
import {
  CreateUserRequestDto,
  UserProfileResponseDto,
} from '../../docs/swagger.models.js';
import { Public } from '../../shared/decorators/auth.public.decorator.js';
import { type Request } from 'express';

@ApiTags('Users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserRequestDto,
  })
  @ApiCreatedResponse({
    type: UserProfileResponseDto,
  })
  async register(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto,
  ) {
    const user = await this.userService.register(body);

    return successResponse('User registered successfully', user);
  }

  @Get()
  @ApiCookieAuth('cookieAuth')
  @ApiOperation({ summary: 'Fetch the authenticated user profile' })
  @ApiOkResponse({
    type: UserProfileResponseDto,
  })
  async getProfile(@Req() req: Request) {
    const id = req.user?.sub;
    console.log(id);
    const user = await this.userService.getProfile(id);

    return successResponse('User profile fetched successfully', user);
  }
}
