import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EntryData } from '../../common/dto/entry-data.dto';
import { ApiOkResponse } from '../../decorators/api-ok-response.decorator';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { Auth } from '../../decorators/http.decorators';
import { File } from './entities/file.entity';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Auth([])
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    type: File,
    description: 'Successfully',
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File | Express.MulterS3.File,
    @AuthUser() user
  ) {
    const data = await this.filesService.uploadFile(file, user);
    return new EntryData({
      data,
    });
  }

  @Get()
  download(@Param('path') path, @Response() response) {
    return response.sendFile(path, { root: './public/uploads' });
  }
}
