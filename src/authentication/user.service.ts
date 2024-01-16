import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.customer.findUnique({
      where: { email },
    });
    return user;
  }

  async findOneById(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
    });
  }

  async verifyEmail(email: string) {
    return this.prisma.customer.update({
      where: { email },
      data: { isVerified: true },
    });
  }
}
