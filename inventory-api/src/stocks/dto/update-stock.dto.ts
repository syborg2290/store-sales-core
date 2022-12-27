import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateStockDto } from './create-stock.dto';

export class UpdateStockDto extends PartialType(CreateStockDto) {}
export class UpdateStockImageDto {
  @IsString()
  mainKey: string;
  @IsString()
  largeSizeKey: string;
  @IsString()
  mediumSizeKey: string;
  @IsString()
  smallSizeKey: string;

  @IsString()
  stockId: string;
}
