import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { EntityHelper } from '../../../common/entity-helper';
import { File } from '../../files/entities/file.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Project extends EntityHelper {
  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  private: boolean;

  @OneToOne(() => File)
  @JoinColumn()
  image?: File | null;

  @OneToOne(() => User)
  @JoinColumn()
  user?: User | null;
}
