import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AuthService } from '../service/auth.service';
import { AccessToken } from '../dto/accessToken.dto';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(private authSrv: AuthService) {}

  @Mutation(() => AccessToken)
  async login(
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string,
  ) {
    return this.authSrv.login(email, password);
  }
}
