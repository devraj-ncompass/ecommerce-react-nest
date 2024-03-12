import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { OrderItem } from 'src/order/entity/order-item.entity';
import { Order } from 'src/order/entity/order.entity';

import { Product } from 'src/product/entity/product.entity';
import { ShippingAddress } from 'src/user/entity/shipping-address.entity';
import { User } from 'src/user/entity/user.entity';


export const dbConfig: TypeOrmModuleAsyncOptions = {
    useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Order,OrderItem, User, ShippingAddress, Product],
        synchronize: true,
        logging: true
    }),
};