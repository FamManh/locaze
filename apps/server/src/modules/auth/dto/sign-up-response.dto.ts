import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../modules/user/entities/user.entity';
import { TokenDto } from './token.dto';

export class SignUpResponseDto {
  @ApiProperty()
  token: TokenDto;

  @ApiProperty()
  user: User;
}
