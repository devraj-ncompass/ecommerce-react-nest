import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryColumn()
    id: string;

    @Column({ name: 'product_name', length: 255 })
    productName: string;

    @Column({ name: 'product_model', length: 100 })
    productModel: string;

    @Column('int')
    availability: number;

    @Column('int')
    rating: number;

    @Column({ length: 50 })
    type: string;

    @Column('decimal', { precision: 10, scale: 2 })
    product_price: number;

    @Column('text')
    product_description: string;
}
