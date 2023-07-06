import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntryData } from '../../common/dto/entry-data.dto';
import { RoleType } from '../../constants';
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
import { ApiPageOkResponse } from '../../decorators/api-page-ok-response.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  @Auth([RoleType.USER])
  async create(
    @Body() createUserDto: CreateUserDto,
    @AuthUser() authUser: User
  ) {
    console.log('Auth user', authUser);
    const user = await this.userService.create(createUserDto);
    return new EntryData({
      data: user,
      message: 'Create successfully',
      success: true,
    });
  }

  @Get()
  @ApiPageOkResponse({
    type: User,
    description: 'Successfully',
  })
  @Auth([RoleType.USER])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  @Auth([RoleType.USER])
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: +id });
  }

  @Patch(':id')
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  @Auth([RoleType.ADMIN])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  @Auth([RoleType.ADMIN])
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
