import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { EntityHelper } from '../../../common/entity-helper';

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
}
