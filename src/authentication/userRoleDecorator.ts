import { SetMetadata } from '@nestjs/common';

export const UserRoleDecorator = (userRole: string) => SetMetadata('userRole', userRole);
