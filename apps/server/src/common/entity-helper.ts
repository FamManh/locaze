import { ApiProperty } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import {
  AfterLoad,
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class EntityHelper extends BaseEntity {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __entity?: string;

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  @ApiProperty()
  updatedAt: Date;

  @AfterLoad()
  setEntityName() {
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
