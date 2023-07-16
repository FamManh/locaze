import { posix } from 'node:path';
import { ApiProperty } from '@nestjs/swagger';
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityHelper } from '../../../common/entity-helper';
import appConfig from '../../../config/app.config';
import { AppConfig } from '../../../config/config.type';
import { User } from '../../user/entities/user.entity';
import { FileProviderEnum } from '../enums/file-provider.enum';

@Entity({ name: 'file' })
export class File extends EntityHelper {
  @Column()
  @ApiProperty()
  url: string;

  @Column()
  @ApiProperty()
  mimetype: string;

  @Column()
  @ApiProperty()
  originalname: string;

  @Column()
  @ApiProperty()
  size: number;

  @Column({
    type: 'enum',
    enum: FileProviderEnum,
    default: FileProviderEnum.LOCAL,
  })
  provider: FileProviderEnum;

  @OneToOne(() => User)
  @JoinColumn()
  user?: User | null;

  @AfterLoad()
  @AfterInsert()
  updateUrl() {
    if (this.url.indexOf('') === 0) {
      this.url = new URL(
        posix.join(
          (appConfig() as AppConfig).backendDomain,
          'static',
          'uploads',
          this.url
        )
      ).toString();
    }
  }
}
