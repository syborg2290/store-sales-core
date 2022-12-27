import { IsString } from 'class-validator';

export class CreateSignedUrlDto {
  @IsString()
  fileName: string;

  @IsString()
  stockId: string;
}
