import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Trim } from 'src/util/transform.decorator';

export class Product {
  @ApiProperty()
  @Trim()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsInt()
  quantity: number;
}

export class OrderCreateDto {
  userId: string;

  @ApiProperty()
  @Trim()
  @IsNotEmpty()
  @IsString()
  addressId: string;

  @ApiProperty({ isArray: true, type: Product })
  @ValidateNested()
  @ArrayNotEmpty()
  @Type(() => Product)
  products: Product[];
}
