import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyDto {
  @ApiProperty()
  @IsString()
  mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6)
  otp: string;
}
