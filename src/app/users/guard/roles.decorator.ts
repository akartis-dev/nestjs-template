import { USERS_ROLE } from '../interfaces/types';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: USERS_ROLE[]) => SetMetadata(ROLES_KEY, roles);
