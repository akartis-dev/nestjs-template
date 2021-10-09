import { USERS_ROLE } from '../../../app/users/interfaces/types';

export type JwtPayload = {
  email: string;
  sub: number;
  roles: USERS_ROLE;
};
