import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../modules/user/entities/user.entity';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count === 0) {
      await this.repository.save(
        this.repository.create({
          firstName: 'Admin',
          lastName: 'System',
          username: 'admin',
          email: 'admin@locaze.site',
          password: 'secret',
        })
      );
    }
  }
}
