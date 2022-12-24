import { PartialType } from '@nestjs/mapped-types';
import { CreateSalepointDto } from './create-salepoint.dto';

export class UpdateSalepointDto extends PartialType(CreateSalepointDto) {}
