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
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
import { ApiPageOkResponse } from '../../decorators/api-page-ok-response.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';
import { LanguageService } from './language.service';

@ApiTags('Languages')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Auth([])
  @Post()
  @ApiOkResponse({
    type: Language,
    description: 'Successfully',
  })
  async create(@Body() createLanguageDto: CreateLanguageDto, @AuthUser() user) {
    const data = await this.languageService.create(createLanguageDto, user);
    return new EntryData({
      data,
    });
  }

  @Auth([])
  @Get()
  @ApiPageOkResponse({
    type: Language,
    description: 'Successfully',
  })
  async findAll() {
    const data = await this.languageService.findAll();
    return new EntryData({
      data,
    });
  }

  @Auth([])
  @Get(':id')
  @ApiOkResponse({
    type: Language,
    description: 'Successfully',
  })
  async findOne(@Param('id') id: number) {
    const data = await this.languageService.findOne({ id });
    return new EntryData({ data });
  }

  @Auth([])
  @Patch(':id')
  @ApiOkResponse({
    type: Language,
    description: 'Successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    const data = await this.languageService.update(+id, updateLanguageDto);
    return new EntryData({ data });
  }

  @Auth([])
  @Delete(':id')
  @ApiOkResponse({
    type: Language,
    description: 'Successfully',
  })
  async remove(@Param('id') id: string) {
    const data = await this.languageService.remove(+id);
    return new EntryData({ data });
  }
}
