import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { ProjectModule } from '../project/project.module';
import { Language } from './entities/language.entity';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';

@Module({
  imports: [FilesModule, ProjectModule, TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
