import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../core/auth/auth.module';
import { RolesGuard } from './users/guard/roles.guard';
import { APP_GUARD } from '@nestjs/core';

const path = require('path');

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: path.join(process.cwd(), '/graphql-typedefs.gql'),
      sortSchema: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule {}
