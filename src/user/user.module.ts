import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule],
  providers: [UserService, JwtService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
