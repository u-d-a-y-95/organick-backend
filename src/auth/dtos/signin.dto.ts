import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsString()
  mobile: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
