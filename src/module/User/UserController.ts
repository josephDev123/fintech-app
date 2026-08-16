import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
import { AuthGuard } from '../../shared/guards/auth.guard.js';

@ApiTags('Users')
@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  // @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Fetch a user profile' })
  @ApiParam({
    name: 'id',
    description: 'User identifier',
    example: '4b0ebf08-1c4c-4a7d-8b0a-9f4d42c1f4bc',
  })
  @ApiOkResponse({
    type: UserProfileResponseDto,
  })
  async getProfile(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.getProfile(id);

    return successResponse('User profile fetched successfully', user);
  }
}
