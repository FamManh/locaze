import { User } from '../../../modules/user/entities/user.entity';
import { TokenDto } from '../dto/token.dto';

export type SignUpResponse = Readonly<{
  token: TokenDto;
  user: User;
}>;
