import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllConfigType } from '../../config/config.type';
import { File } from './entities/file.entity';
import { FileProviderEnum } from './enums/file-provider.enum';

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  async uploadFile(file: Express.Multer.File | Express.MulterS3.File) {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const payload = {
      local: {
        url: file.filename,
        mimetype: file.mimetype,
        originalname: file.originalname,
        provider: FileProviderEnum.LOCAL,
        size: file.size,
      },
      s3: {
        url: (file as Express.MulterS3.File).location,
        mimetype: (file as Express.MulterS3.File).mimetype,
        originalname: (file as Express.MulterS3.File).originalname,
        provider: FileProviderEnum.S3,
        size: (file as Express.MulterS3.File).size,
      },
    };

    return this.fileRepository.save(
      this.fileRepository.create({
        ...payload[
          this.configService.getOrThrow('file.driver', { infer: true })
        ],
      })
    );
  }
}
