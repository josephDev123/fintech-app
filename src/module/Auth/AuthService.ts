import { Injectable } from '@nestjs/common';
import { AuthRepository } from './AuthRepository.js';

@Injectable()
export class AuthService {
  constructor(private readonly AuthRepository: AuthRepository) {}

  async create() {
    return this.AuthRepository.create();
  }
}
