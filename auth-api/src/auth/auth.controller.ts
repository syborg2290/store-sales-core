import {
    Controller,
    Request,
    Post,
    Get,
    Headers,
    UseGuards,
    HttpStatus,
    HttpCode,
    Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDTO, LoginUserDTO } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() loginData: LoginUserDTO) {
        const responseData =  await this.authService.login(loginData);

        return {
            statusCode:HttpStatus.OK,
            message:"User logged successfully",
            data:responseData
        }
    }
    @HttpCode(HttpStatus.CREATED)
    @Post('/register')
    async register(@Body() registerData: RegisterUserDTO) {
        const responseData = await this.authService.register(registerData);
        return {
            statusCode:HttpStatus.CREATED,
            message:"User created successfully",
            data:responseData
        }
    }
    @UseGuards(JwtAuthGuard)
    @Get('/current-user')
    getProfile(@Headers('user') user: any) {
        console.log(user)
        return user;
    }
}
