import { Module } from '@nestjs/common';
import { UsersResolver } from './resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersResolver],
})
export class UsersModule {}
