import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { EntityCondition } from '../../utils/types/entity-condition.type';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createUserDto)
    );
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({ where: fields });
  }

  findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  update(id: number, payload: DeepPartial<User>) {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      })
    );
  }

  remove(id: number) {
    return this.usersRepository.softDelete(id);
  }
}
