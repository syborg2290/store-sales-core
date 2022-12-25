import { DateFormatService } from 'src/utils/services/date-format.service';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'stocks',
  synchronize: true,
})
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cost: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'salepoint_id',
  })
  salepointId: string;

  @Column({
    name: 'business_id',
  })
  businessId: string;

  @Column({
    name: 'created_at',
    default: DateFormatService.getFormatDateForPersistenceEnvironment(),
  })
  createdAt: string;

  @Column({
    name: 'updated_at',
    default: DateFormatService.getFormatDateForPersistenceEnvironment(),
  })
  updatedAt: string;
}
