import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UnitCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  fullName: string;
}

export class UnitUpdateDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  fullName: string;
}
