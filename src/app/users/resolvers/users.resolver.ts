import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from '../entities/user.entity';
import CreateUserInput from '../dto/createUserInput.dto';
import { UsersService } from '../services/users.service';
import { CurrentToken } from '../decorator/user.decorator';
import { Roles } from '../guard/roles.decorator';
import { USERS_ROLE } from '../interfaces/types';

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

  @Mutation((returns) => User)
  createUserAdmin(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userSrv.createUserAdmin(createUserInput);
  }

  @Query(() => User)
  async getProfile(@CurrentToken() token) {
    return await this.userSrv.getUserByToken(token);
  }

  @Query(() => User)
  @Roles(USERS_ROLE.ROLE_ADMIN)
  async getUserProfile(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.userSrv.getUserProfile(id);
  }

  @Subscription(() => String)
  subscribe() {
    return pubSub.asyncIterator('demo');
  }
}
