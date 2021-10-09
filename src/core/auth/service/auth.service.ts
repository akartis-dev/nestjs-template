import { Injectable, UnauthorizedException } from '@nestjs/common';
import { comparePassword } from '../../../app/utils';
import { UsersService } from '../../../app/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../app/users/entities/user.entity';
import { JwtPayload } from '../interface/type';

@Injectable()
export class AuthService {
  constructor(private userSrv: UsersService, private jwtSrv: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userSrv.findOneByEmail(email);
    const passwordValid = await comparePassword(password, user?.password);

    if (user && passwordValid) {
      return user;
    }

    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Bad credential');
    }
    const payload: JwtPayload = {
      email: user?.email,
      sub: user?.id,
      roles: user?.roles,
    };

    return { access_token: this.jwtSrv.sign(payload) };
  }
}
