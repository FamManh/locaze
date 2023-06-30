import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';

export class SignUpDto {
  @ApiProperty()
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @ApiProperty()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
