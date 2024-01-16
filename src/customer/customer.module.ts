import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaService } from 'src/prisma.service';
import { CustomerResolver } from './customer.resolver';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { TokenValidator, } from 'src/authentication/authenticationValidators';

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [TokenValidator, CustomerService, PrismaService, CustomerResolver],
})
export class CustomerModule {}
