import { Injectable } from '@nestjs/common';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDTO, LoginUserDTO } from 'src/users/dto/user.dto';
import User from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import JwtAuthPayload from './interfaces/jwt-payload.interface';
import { UserLoggedResponse } from './interfaces/response.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const userFound = await this.usersService.findOne(email);

        if (userFound && await bcrypt.compare(password,userFound.password)) {
            return userFound;
        }
        return null;
    }

    async login(userData: LoginUserDTO):Promise<UserLoggedResponse> {

        const user = await this.validateUser(userData.email, userData.password)

        if(!user) throw new UnauthorizedException("Invalid credentials")
        console.log(user)
        const payload:JwtAuthPayload = { email: user.email, id: user.id, businessId:user.businessId };
        console.log(payload)
        const userWithBusiness = await this.usersService.findWithBusiness(user.id)
        return {
            accessToken: this.jwtService.sign(payload),
            type: 'Bearer',
            user:userWithBusiness
        };
    }
    public async register(userData: RegisterUserDTO):Promise<UserLoggedResponse> {
        const userFound = await this.usersService.findOne(userData.email)
        if(userFound) throw new BadRequestException("User already exist")

        const newUser = await this.usersService.create(userData)
        
        const payload:JwtAuthPayload = {
            id:newUser._id,
            email:newUser.email,
            businessId:newUser.businessId
        }
        const accessToken = this.jwtService.sign(payload)
        const userWithBusiness = await this.usersService.findWithBusiness(userFound.id)
        return {
            accessToken,
            type:'Bearer',
            user:userWithBusiness,
        }
    }
}
