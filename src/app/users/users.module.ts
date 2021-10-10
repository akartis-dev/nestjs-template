import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { AuthModule } from '../../core/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
