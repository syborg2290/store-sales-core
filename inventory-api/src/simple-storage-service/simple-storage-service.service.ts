import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 } from 'uuid';
import { StocksService } from 'src/stocks/stocks.service';

@Injectable()
export class SimpleStorageServiceService {
  private readonly s3: S3Client;
  private readonly validExtensions = ['jpg', 'jpeg', 'png'];
  private readonly uuid = v4;
  constructor(private readonly stockService: StocksService) {
    this.s3 = new S3Client({
      region: 'us-east-1',
      credentials: {
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      },
    });
  }

  public async createPutSignedUrlForStock(
    fileName: string,
    stockId: string,
    salepointId: string,
  ): Promise<string> {
    const fileNameFormatted = this.getFileNameFormatted(fileName);
    await this.stockService.findOne(stockId);
    const stockImage = await this.stockService.createEmptyStockImage();
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${process.env.AWS_S3_MAIN_KEY}/${salepointId}/${process.env.AWS_S3_STOCKS_KEY}/original/${stockId}---${stockImage.id}---${fileNameFormatted}`,
    };
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: Number(process.env.EXPIRES_IN_PUT_OBJECT_S3),
    });
    return url;
  }

  public async createGetSignedUrl(key: string): Promise<string> {
    return;
  }
  private getFileNameFormatted(name: string): string {
    const chunks = name.split('.');

    const extension = chunks.pop().toLocaleLowerCase();

    if (!this.validExtensions.includes(extension))
      throw new BadRequestException('Invalid format');

    return `${this.uuid()}.${extension}`;
  }
}
