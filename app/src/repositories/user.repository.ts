import { Injectable } from '@nestjs/common';
import { PrismaService } from '../interfaces/services/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByApiKey(apikey: string) {
    return this.prisma.user.findUnique({
      where: {
        api_key: apikey,
      },
    });
  }
}
