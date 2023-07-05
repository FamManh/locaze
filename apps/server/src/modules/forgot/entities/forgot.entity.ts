import { Column, Entity, ManyToOne } from 'typeorm';
import { EntityHelper } from '../../../common/entity-helper';
import { User } from '../../../modules/user/entities/user.entity';

@Entity()
export class Forgot extends EntityHelper {
  @Column()
  hash: string;

  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;
}
