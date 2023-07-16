import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { EntityHelper } from '../../../common/entity-helper';
import { File } from '../../files/entities/file.entity';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import { LanguageStatusEnum } from '../enums/language-status.enum';

@Entity()
export class Language extends EntityHelper {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: LanguageStatusEnum,
    default: LanguageStatusEnum.IN_PROGRESS,
  })
  status: LanguageStatusEnum;

  @OneToOne(() => File)
  @JoinColumn()
  image?: File | null;

  @OneToOne(() => User)
  @JoinColumn()
  user?: User | null;

  @OneToOne(() => Project)
  @JoinColumn()
  project?: Project | null;
}
