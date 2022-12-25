import { IsString } from 'class-validator';
export default class CreateBusinessDTO {
    @IsString()
    readonly name: string;

    @IsString()
    readonly address: string;

    @IsString()
    readonly cellPhone: string;
}
