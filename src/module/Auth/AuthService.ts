import { Injectable } from '@nestjs/common';
import { UserService } from '../User/UserService.js';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(input: { email: string; name: string }) {
    return this.userService.register(input);
  }
}
