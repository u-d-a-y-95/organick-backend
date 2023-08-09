import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Trim } from 'src/util/transform.decorator';

export class CategoryCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  imgUrl: string;
}

export class CategoryUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Trim()
  imgUrl: string;
}
