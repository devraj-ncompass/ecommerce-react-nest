import { Controller, Get, UseGuards, Request, Query, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { OrderService } from './order.service';
import { ApiResponse } from 'src/utils/response-handler';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { customError } from 'src/utils/exception-handler';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @UseGuards(JwtGuard)
    @Get()
    async getOrders(@Request() req, @Query() query, @Res() res: Response) {
        const result = await this.orderService.getOrdersForUser(req.user.id, query);
        if (result instanceof customError) {
            return res.status(result.statusCode).json(result);
        }
        return res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, 'Orders fetched successfully', result, res));
    }


    @UseGuards(JwtGuard)
    @Get(':orderId')
    async getOrderById(@Request() req, @Param('orderId') orderId: string, @Res() res: Response) {
        const result = await this.orderService.getOrderByIdForUser(req.user.id, orderId);
        if (result instanceof customError) {
            return res.status(result.statusCode).json(result);
        }
        return res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, 'Order details fetched successfully', result, res));
    }
}
