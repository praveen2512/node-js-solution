import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CustomerInput,
  GetCustomerInput,
  AddCustomerInput,
  UpdateCustomerInput,
} from './dto/customer.input';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async findAll(params: GetCustomerInput) {
    const { skip, take, cursor, where } = params;

    return this.prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async find(params: CustomerInput) {
    const { id, email } = params;
    return this.prisma.customer.findUnique({
      where: { id, email },
    });
  }

  async create(data: AddCustomerInput) {
    return this.prisma.customer.create({
      data,
    });
  }

  async update(params: CustomerInput, data: UpdateCustomerInput) {
    const { id, email } = params;
    return this.prisma.customer.update({
      where: { id, email },
      data,
    });
  }

  async delete(params: CustomerInput) {
    const { id, email } = params;
    return this.prisma.customer.delete({
      where: { id, email },
    });
  }
}
