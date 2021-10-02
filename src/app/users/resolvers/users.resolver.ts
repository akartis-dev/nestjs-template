import { Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Resolver()
export class UsersResolver {
  @Query(() => String)
  demo() {
    return 'demo';
  }

  @Subscription(() => String)
  subscribe() {
    return pubSub.asyncIterator('demo');
  }
}
