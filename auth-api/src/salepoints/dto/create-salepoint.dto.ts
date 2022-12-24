import { IsString } from 'class-validator';

export class CreateSalepointDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsString()
    cellPhone: string;
}
