import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';

export class SignInDto {
  @ApiProperty()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
