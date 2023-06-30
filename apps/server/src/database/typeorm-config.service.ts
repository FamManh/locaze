import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<AllConfigType>) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type', {
        infer: true,
      }) as 'postgres',
      url: this.configService.get('database.url', { infer: true }),
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.username', { infer: true }),
      password: this.configService.get('database.password', {
        infer: true,
      }) as string,
      database: this.configService.get('database.name', {
        infer: true,
      }) as string,
      synchronize: this.configService.get('database.synchronize', {
        infer: true,
      }),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      logging: this.configService.get('app.enableOrmLogs', { infer: true }),
    };
  }
}
