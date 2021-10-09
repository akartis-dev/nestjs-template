import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './users/guard/roles.decorator';
import { USERS_ROLE } from './users/interfaces/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(USERS_ROLE.ROLE_USER)
  getHello(): string {
    return this.appService.getHello();
  }
}
