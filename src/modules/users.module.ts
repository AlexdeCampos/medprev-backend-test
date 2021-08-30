import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { UsersProvider } from '../providers/users.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersProvider],
})

export class UsersModule { }
