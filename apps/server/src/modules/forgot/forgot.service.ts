import { Injectable } from '@nestjs/common';
import { CreateForgotDto } from './dto/create-forgot.dto';
import { UpdateForgotDto } from './dto/update-forgot.dto';

@Injectable()
export class ForgotService {
  create(createForgotDto: CreateForgotDto) {
    return 'This action adds a new forgot';
  }

  findAll() {
    return `This action returns all forgot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forgot`;
  }

  update(id: number, updateForgotDto: UpdateForgotDto) {
    return `This action updates a #${id} forgot`;
  }

  remove(id: number) {
    return `This action removes a #${id} forgot`;
  }
}
