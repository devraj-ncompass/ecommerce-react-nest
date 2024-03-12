import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';

import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll(query): Promise<Product[]> {
    const { page = 1, limit = 10, search, sort, type } = query;
    
    const skip = (page - 1) * limit;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (type) {
      queryBuilder.andWhere('product.type = :type', { type});
    }
    
    if (search) {
        queryBuilder.andWhere(new Brackets(qb => {
          qb.where('product.product_name LIKE :search', { search: `%${search}%` })
            .orWhere('product.product_model LIKE :search', { search: `%${search}%` })
            .orWhere('product.id LIKE :search', { search: `%${search}%` });
        }));
    }
      
    if (sort) {
      const [field, order] = sort.split(':');
      if (['product_name', 'rating', 'product_price'].includes(field)) {
        queryBuilder.addOrderBy(`product.${field}`, order.toUpperCase());
      }
    }

    queryBuilder.skip(skip).take(limit);

    return queryBuilder.getMany();
  }
}



