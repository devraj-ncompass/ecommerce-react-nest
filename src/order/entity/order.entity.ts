import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
    CreateDateColumn, UpdateDateColumn, BeforeInsert, JoinColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ShippingAddress } from 'src/user/entity/shipping-address.entity';
import { User } from 'src/user/entity/user.entity';
import { OrderItem } from './order-item.entity';



@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => ShippingAddress)
    @JoinColumn({ name: 'shipping_address_id' })
    shippingAddress: ShippingAddress;

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    orderItems: OrderItem[];

    @Column()
    orderNumber: string;

    @Column({ default: 'PROCESSING' })
    status: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    totalAmount: number;

    @Column()
    paymentMethod: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }

    calculateTotalPrice() {
        const totalPrice = this.orderItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        this.totalAmount = totalPrice;
    }
}
