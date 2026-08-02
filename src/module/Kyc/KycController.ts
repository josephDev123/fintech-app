import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { successResponse } from '../../shared/http/api-response.js';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe.js';
import { KycService } from './KycService.js';
import type { ReviewKycDto } from './dto/review-kyc.dto.js';
import type { SubmitKycDto } from './dto/submit-kyc.dto.js';
import { reviewKycSchema, submitKycSchema } from './validation/kyc.validation.js';

@Controller('api/v1/kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Post(':userId')
  async submit(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body(new ZodValidationPipe(submitKycSchema)) body: SubmitKycDto,
  ) {
    const kyc = await this.kycService.submit(userId, body);

    return successResponse('KYC submitted successfully', kyc);
  }

  @Get(':userId')
  async get(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const kyc = await this.kycService.getByUserId(userId);

    return successResponse('KYC record fetched successfully', kyc);
  }

  @Patch(':userId/review')
  async review(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body(new ZodValidationPipe(reviewKycSchema)) body: ReviewKycDto,
  ) {
    const kyc = await this.kycService.review(userId, body);

    return successResponse('KYC review updated successfully', kyc);
  }
}
