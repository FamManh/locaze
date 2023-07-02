import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EntryData } from '../../common/dto/entry-data.dto';
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
import { ApiPageOkResponse } from '../../decorators/api-page-ok-response.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return new EntryData({
      data: user,
      message: 'Create successfully',
      success: true,
    });
  }

  @ApiBearerAuth()
  @Get()
  @ApiPageOkResponse({
    type: User,
    description: 'Successfully',
  })
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({
    type: User,
    description: 'Successfully',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
