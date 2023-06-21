import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Get from env file
const saltOrRounds = 10;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    this.password = await bcrypt.hash(this.password, saltOrRounds);
  }

  @DeleteDateColumn()
  deletedAt: Date;
}
