import { IsEmail, IsObject, IsString, MinLength } from 'class-validator';
import CreateBusinessDTO from 'src/businesses/dto/create-business.dto';

export class RegisterUserDTO {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsObject()
    business: CreateBusinessDTO;
}

export class LoginUserDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}
