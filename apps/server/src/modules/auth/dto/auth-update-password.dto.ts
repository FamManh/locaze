import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class AuthUpdatePasswordDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'mustBeNotEmpty' })
  oldPassword: string;
}
