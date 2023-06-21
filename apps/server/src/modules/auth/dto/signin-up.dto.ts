import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';

export class SignUpDto {
  @Transform(lowerCaseTransformer)
  @IsEmail()
  email: string;

  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;
}
