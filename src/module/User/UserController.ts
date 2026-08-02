import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { successResponse } from '../../shared/http/api-response.js';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { UserService } from './UserService.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { createUserSchema } from './validation/create-user.validation.js';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto,
  ) {
    const user = await this.userService.register(body);

    return successResponse('User registered successfully', user);
  }

  @Get(':id')
  async getProfile(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.userService.getProfile(id);

    return successResponse('User profile fetched successfully', user);
  }
}
