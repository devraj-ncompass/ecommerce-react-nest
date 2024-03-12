import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

import { customError } from 'src/utils/exception-handler';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
    ) { }
    @InjectRepository(User) private userRepository: Repository<User>;

    async createUser(createUserDto: createUserDto){
        try{
            const {email, password, fullName} = createUserDto
            const existingUser = await this.userRepository.findOneBy({ email });

            if (existingUser) {
                return 'User already exists!';
              }
            const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');

            const newUser = this.userRepository.create({
                email, password: hashedPassword, fullName
            });

            const createNewUserResponse = this.userRepository.save(newUser);
            return createNewUserResponse;
        }
        catch(error){
            return new customError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Some Error Occured',
                error.message,
              );
        }
    }

    async validateUser(email: string, password: string){
        try{
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user)
                return new customError(
                HttpStatus.UNAUTHORIZED,
                'Invalid Credentials',
                'User not found');
            const hashedPassword = crypto
            .createHash('md5')
            .update(password)
            .digest('hex');

            const userCredential = await this.userRepository.findOne({
                where: { id: user.id },
            });

            if (!userCredential || hashedPassword !== userCredential.password)
                return new customError(
                    HttpStatus.FORBIDDEN,
                    'Invalid Credentials',
                    'Password mismatch',
                );
            return user;
        }catch(error){
            return new customError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Some Error Occured',
                error.message,
              );
        }
    }

    async login(email: string, password: string){
        try{
            const validate = await this.validateUser(email, password);
            if (validate instanceof customError) {
                return validate;
              }
            const user = await this.userService.findOne(email);
            if (user instanceof customError) {
                return user;
              }
            
            const payload = { email: user.email};
            
             

            return {
                access_token: this.jwtService.sign(payload),
              };
        }catch(error){
            return new customError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                'Some Error Occured',
                error.message,
              );
        }
    }
}
