import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase URL or Key is missing in environment variables.',
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async getUserData() {
    const { data, error } = await this.supabase
      .from('product') // Ganti dengan nama tabel yang sesuai di Supabase
      .select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
