import { PartialType } from '@nestjs/swagger';
import { CreateForgotDto } from './create-forgot.dto';

export class UpdateForgotDto extends PartialType(CreateForgotDto) {}
