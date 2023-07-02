import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.save(
      this.projectRepository.create(createProjectDto)
    );
  }

  findAll() {
    return this.projectRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneOrFail({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.save(
      this.projectRepository.create({
        id,
        ...updateProjectDto,
      })
    );
  }

  remove(id: number) {
    return this.projectRepository.softDelete(id);
  }
}
