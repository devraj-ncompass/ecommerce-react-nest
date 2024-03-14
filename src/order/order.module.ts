import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { OrderService } from './order.service';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';
import { OrderController } from './order.controller';
import { jwtConfig } from 'src/utils/jwt-config';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderItem]),
            JwtModule.registerAsync(jwtConfig),
            PassportModule, ],
  providers: [OrderService, JwtStrategy],
  controllers: [OrderController],
  exports:[OrderService]
})
export class OrderModule {}