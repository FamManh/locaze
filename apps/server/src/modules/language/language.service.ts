import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { FilesService } from '../files/files.service';
import { ProjectService } from '../project/project.service';
import { User } from '../user/entities/user.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
    private fileService: FilesService,
    private projectService: ProjectService
  ) {}

  async create(createLanguageDto: CreateLanguageDto, user: User) {
    const image = await this.fileService.findOne(createLanguageDto.image);
    const project = await this.projectService.findOne({
      id: createLanguageDto.project,
    });
    return this.languageRepository.save(
      this.languageRepository.create({
        ...createLanguageDto,
        image,
        user,
        project,
      })
    );
  }

  findAll() {
    return this.languageRepository.find({
      relations: ['image', 'user'],
    });
  }

  async findOne(fields: EntityCondition<Language>) {
    const language = await this.languageRepository.findOne({
      where: fields,
      relations: ['image', 'user'],
    });
    if (!language) {
      throw new NotFoundException();
    }
    return language;
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    const image = await this.fileService.findOne(updateLanguageDto.image);
    return this.languageRepository.save(
      this.languageRepository.create({
        ...updateLanguageDto,
        id,
        image,
      })
    );
  }

  remove(id: number) {
    return this.languageRepository.softDelete(id);
  }
}
