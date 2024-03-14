import { Controller, Get, Query, Res } from '@nestjs/common';

import { ProductService } from './product.service';
import { ApiResponse } from 'src/utils/response-handler';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get('get')
  async getProducts(@Query() query, @Res() res) {
    try {
      const products = await this.productService.findAll(query);
      return new ApiResponse(
        200,
        'Products fetched successfully',
        products,
        res,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

