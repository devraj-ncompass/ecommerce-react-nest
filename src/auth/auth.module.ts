import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { jwtConfig } from 'src/utils/jwt-config';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
          JwtModule.registerAsync(jwtConfig),
          UserModule,
          PassportModule],
  providers:[AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService, PassportModule]
})
export class AuthModule {}
