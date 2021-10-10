import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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

  @Column({ type: 'tinytext' })
  @Field()
  address: string;

  @Column({ type: 'tinytext', nullable: true })
  @Field({ nullable: true })
  education: string;

  @Column({ default: false })
  @Field()
  isActive: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  @Field()
  updatedAt?: Date;
}
