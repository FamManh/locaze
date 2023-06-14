import { Injectable } from '@nestjs/common';
import {
  type TypeOrmModuleOptions,
  type TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'locaze@123',
      database: 'locaze',
      entities: [],
      synchronize: true,
    };
  }
}
