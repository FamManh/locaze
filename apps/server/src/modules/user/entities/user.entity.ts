import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { EntityHelper } from '../../../common/entity-helper';
import { UserStatusEnum } from '../enums/user-status.enum';

// Todo: Get from env file
const saltOrRounds = 10;

@Entity()
export class User extends EntityHelper {
  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.inactive,
  })
  status: UserStatusEnum;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }
}
