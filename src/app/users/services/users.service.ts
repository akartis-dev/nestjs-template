import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserInput from '../dto/createUserInput.dto';
import { hashPassword } from '../../utils';
import validator from 'validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(input: CreateUserInput) {

    if (!validator.isEmail(input.email)) {
      throw Error('Email is invalid');
    }

    const user = this.userRepository.create(input);
    user.password = await hashPassword(input.password);

    return await this.userRepository.save(user);
  }
}
