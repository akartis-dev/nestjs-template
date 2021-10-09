import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../entities/user.entity';
import CreateUserInput from '../dto/createUserInput.dto';
import { UsersService } from '../services/users.service';

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

  @Subscription(() => String)
  subscribe() {
    return pubSub.asyncIterator('demo');
  }
}
