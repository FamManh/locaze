import { Transform } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';

export class SignInDto {
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  username: string;

  @IsNotEmpty()
  password: string;
}
