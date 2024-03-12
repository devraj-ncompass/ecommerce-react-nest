import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './utils/db-config';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';


@Module({
  imports: [AuthModule, UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(dbConfig),
    ProductModule,
    OrderModule],
  controllers: [AppController, UserController, OrderController],
  providers: [AppService],
})
export class AppModule {}
