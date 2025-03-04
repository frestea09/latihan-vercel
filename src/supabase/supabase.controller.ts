import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller()
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get('users')
  async getUsers() {
    const users = await this.supabaseService.getUserData();
    return users;
  }
}
