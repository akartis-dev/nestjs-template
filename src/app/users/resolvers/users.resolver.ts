import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../entities/user.entity';
import CreateUserInput from '../dto/createUserInput.dto';
import { UsersService } from '../services/users.service';
import { CurrentToken } from '../decorator/user.decorator';

const pubSub = new PubSub();

@Resolver()
export class UsersResolver {
  constructor(private userSrv: UsersService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userSrv.createUser(createUserInput);
  }

  @Query(() => User)
  async getProfile(@CurrentToken() token) {
    return await this.userSrv.getUserByToken(token);
  }

  @Subscription(() => String)
  subscribe() {
    return pubSub.asyncIterator('demo');
  }
}
