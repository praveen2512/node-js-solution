import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Customer } from 'lib/entities/customer.entity';
import { CustomerService } from './customer.service';
import {
  CustomerInput,
  GetCustomerInput,
  AddCustomerInput,
  UpdateCustomerInput,
} from './dto/customer.input';
import {
  AuthenticationMiddleware,
  UserRoleValidator,
} from 'src/authentication/authenticationValidators';

import { UserRoleDecorator } from 'src/authentication/userRoleDecorator';

@UseGuards(AuthenticationMiddleware)
@UseGuards(UserRoleValidator)
@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => [Customer])
  async customers(@Args('data') { skip, take, where }: GetCustomerInput) {
    return this.customerService.findAll({ skip, take, where });
  }

  @Query(() => Customer)
  async getCustomer(@Args('input') input: CustomerInput) {
    return this.customerService.find(input);
  }

  @UserRoleDecorator('ADMIN')
  @Mutation(() => Customer)
  async addCustomer(@Args('data') data: AddCustomerInput) {
    return this.customerService.create(data);
  }

  @UserRoleDecorator('ADMIN')
  @Mutation(() => Customer)
  async updateCustomer(
    @Args('input') input: CustomerInput,
    @Args('data') data: UpdateCustomerInput,
  ) {
    return this.customerService.update(input, data);
  }

  @UserRoleDecorator('ADMIN')
  @Mutation(() => Customer)
  async deleteCustomer(@Args('input') input: CustomerInput) {
    return this.customerService.delete(input);
  }
}
