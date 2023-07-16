import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(2)
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(2)
  @MaxLength(512)
  description: string;

  @ApiProperty()
  @IsBoolean()
  private: boolean;

  @IsInt()
  @ApiProperty()
  image: number;
}
