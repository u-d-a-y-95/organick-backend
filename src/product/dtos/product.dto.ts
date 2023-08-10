import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Trim } from 'src/util/transform.decorator';

export class ProductCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  stock: number;
  @ApiProperty()
  @IsArray()
  imgUrl: string[];

  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  unitId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  categoryId: string;
}
export class ProductUpdateDto {
  @ApiPropertyOptional()
  @Trim()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @Trim()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiPropertyOptional()
  @IsPositive()
  @IsInt()
  @IsOptional()
  stock: number;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  imgUrl: string[];

  @ApiPropertyOptional()
  @Trim()
  @IsNotEmpty()
  @IsOptional()
  unitId: string;

  @ApiPropertyOptional()
  @Trim()
  @IsNotEmpty()
  @IsOptional()
  categoryId: string;
}
