import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../../app/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../app/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from './constants';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '7200s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService, AuthService, AuthResolver],
})
export class AuthModule {}
