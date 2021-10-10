import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserInput from '../dto/createUserInput.dto';
import { hashPassword } from '../../utils';
import validator from 'validator';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret } from '../../../core/auth/constants';
import { JwtPayload } from '../../../core/auth/interface/type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Create user
   * @param {CreateUserInput} input
   * @returns {Promise<User>}
   */
  async createUser(input: CreateUserInput) {
    if (!validator.isEmail(input.email)) {
      throw Error('Email is invalid');
    }

    const user = this.userRepository.create(input);
    user.password = await hashPassword(input.password);

    return await this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  async getUserByToken(token: string) {
    try {
      const data: JwtPayload = this.jwtService.verify(token, {
        secret: jwtSecret,
      });

      return await this.userRepository.findOne({ email: data.email });
    } catch (e) {
      console.log('getUserByToken---->', e);
      return null;
    }
  }
}
