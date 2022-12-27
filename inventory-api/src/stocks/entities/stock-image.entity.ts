import { DateFormatService } from 'src/utils/services/date-format.service';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stock } from './stock.entity';

@Entity({
  name: 'stock_images',
  synchronize: true,
})
export class StockImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'main_key',
    nullable: true,
  })
  mainKey: string;

  @Column({
    name: 'large_size_key',
    nullable: true,
  })
  largeSizeKey: string;

  @Column({
    name: 'medium_size_key',
    nullable: true,
  })
  mediumSizeKey: string;

  @Column({
    name: 'small_size_key',
    nullable: true,
  })
  smallSizeKey: string;

  @Column({
    name: 'created_at',
    default: DateFormatService.getFormatDateForPersistenceEnvironment(),
  })
  createdAt: string;

  @ManyToOne(() => Stock, (stock) => stock.images, {
    nullable: true,
  })
  stock: Stock;
}
