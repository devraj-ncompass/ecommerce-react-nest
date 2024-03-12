import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BeforeInsert,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ShippingAddress } from './shipping-address.entity';
import { Order } from 'src/order/entity/order.entity';

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 200 })
    email: string;

    @Column({ length: 200 })
    password: string;

    @Column({ length: 200 })
    fullName: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;

    @OneToMany(() => ShippingAddress, (shippingAddress) => shippingAddress.user, { cascade: true })
    shippingAddresses: ShippingAddress[];

    @OneToMany(() => Order, (order) => order.user, { cascade: true } )
    orders: Order[];

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}
