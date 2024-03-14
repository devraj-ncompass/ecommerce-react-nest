import {
    Body,
    Controller,
    HttpStatus,
    HttpException,
    Next,
    Post,
    Res,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';

import { AuthService } from './auth.service';
import { customError } from 'src/utils/exception-handler';
import { ApiResponse } from 'src/utils/response-handler';
import { createUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    userService: any;
    constructor(private authService: AuthService) { }

    @Post('register')
    async createUser(
        @Body() createUserDto: createUserDto,
        @Res() res: Response,
        @Next() next: NextFunction
    ) {
        try {
            const createUserResponse = await this.authService.createUser(createUserDto)
            if (createUserResponse instanceof customError) {
                throw createUserResponse;
            }
            return new ApiResponse(
                HttpStatus.FOUND,
                'User Created Successfully',
                createUserResponse,
                res,
            );
        } catch (error) {
            next(error)
        }
    }

    @Post('login')
    async login(
        @Body() body: { email: string; password: string },
        @Res() res: Response,
        @Next() next: NextFunction,
    ) {
        try {
            const user = await this.authService.validateUser(
                body.email,
                body.password,
            );
            if (!user)
                throw new customError(
                    HttpStatus.UNAUTHORIZED,
                    'Invalid credentials',
                    'User not found or invalid password',);

            const tokenResponse = await this.authService.login(body.email, body.password);
            if (tokenResponse instanceof customError) {
                throw tokenResponse
            }
            return new ApiResponse(HttpStatus.OK, 'Login successful', tokenResponse, res);
        } catch (error) {
            next(
                error,
            );
        }
    }
}
