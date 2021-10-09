import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { USERS_ROLE } from '../interfaces/types';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column({ type: 'tinytext' })
  password: string;

  @Column({ type: 'enum', enum: USERS_ROLE, default: USERS_ROLE.ROLE_USER })
  @Field()
  roles?: USERS_ROLE;

  @Column({ default: false })
  @Field()
  isActive: boolean;
}
