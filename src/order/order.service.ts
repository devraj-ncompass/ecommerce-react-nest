import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { customError } from 'src/utils/exception-handler';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/order-item.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>
    ) { }


    async getOrdersForUser(userId: string, query): Promise<Order[] | customError> {
        try {
            const { orderNumber, startDate, endDate } = query;


            let queryBuilder = this.orderRepository.createQueryBuilder('order')
                .leftJoinAndSelect('order.orderItems', 'orderItem')
                .leftJoinAndSelect('orderItem.product', 'product')
                .where('order.user = :userId', { userId });


            if (orderNumber) {
                queryBuilder = queryBuilder.andWhere('order.orderNumber = :orderNumber', { orderNumber });
            }


            if (startDate && endDate) {
                queryBuilder = queryBuilder.andWhere('order.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate });
            }


            const orders = await queryBuilder.getMany();
            return orders;
        } catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch orders', error.message);
        }
    }


    async getOrderByIdForUser(userId: string, orderId: string): Promise<Order | customError> {
        try {
            const order = await this.orderRepository.findOne({
                where: { id: orderId, user: { id: userId } },
                relations: ['orderItems', 'orderItems.product'],
            });


            if (!order) {
                return new customError(HttpStatus.NOT_FOUND, 'Order not found', 'No order found with the provided ID for the user');
            }


            return order;
        } catch (error) {
            return new customError(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to fetch order details', error.message);
        }
    }
}
