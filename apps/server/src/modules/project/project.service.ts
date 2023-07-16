import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { FilesService } from '../files/files.service';
import { User } from '../user/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private fileService: FilesService
  ) {}

  async create(createProjectDto: CreateProjectDto, user: User) {
    const image = await this.fileService.findOne(createProjectDto.image);
    return this.projectRepository.save(
      this.projectRepository.create({ ...createProjectDto, image, user })
    );
  }

  findAll() {
    return this.projectRepository.find({ relations: ['image', 'user'] });
  }

  async findOne(fields: EntityCondition<Project>) {
    const project = await this.projectRepository.findOneOrFail({
      where: fields,
      relations: ['image', 'user'],
    });
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const image = await this.fileService.findOne(updateProjectDto.image);
    return this.projectRepository.save(
      this.projectRepository.create({
        ...updateProjectDto,
        id,
        image,
      })
    );
  }

  remove(id: number) {
    return this.projectRepository.softDelete(id);
  }
}
