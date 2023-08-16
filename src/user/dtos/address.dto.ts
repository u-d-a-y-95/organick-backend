import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Trim } from 'src/util/transform.decorator';

export class AddressCreateDto {
  @ApiProperty()
  @Trim()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @Trim()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiPropertyOptional()
  @Trim()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  label: string;
}

export class AddressUpdateDto {
  @ApiPropertyOptional()
  @Trim()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  location: string;

  @ApiPropertyOptional()
  @Trim()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  label: string;
}
