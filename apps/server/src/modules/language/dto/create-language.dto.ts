import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { LanguageStatusEnum } from '../enums/language-status.enum';

export class CreateLanguageDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(256)
  code: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(2)
  @MaxLength(512)
  description: string;

  @ApiPropertyOptional({ enum: LanguageStatusEnum })
  @IsEnum(LanguageStatusEnum)
  status?: LanguageStatusEnum;

  @IsInt()
  @ApiProperty()
  image: number;

  @IsInt()
  @ApiProperty()
  project: number;
}
