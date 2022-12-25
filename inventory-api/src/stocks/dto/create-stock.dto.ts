import { IsString, IsUrl, IsNumber, IsInt } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  cost: number;

  @IsInt()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  name: string;

  @IsString()
  @IsUrl()
  imageUrl: string;
}
