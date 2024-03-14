import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    BeforeInsert,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { User } from './user.entity';

@Entity()
export class ShippingAddress {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    address: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.shippingAddresses)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @BeforeInsert()
    generateId() {
        this.id = uuidv4();
    }
}  