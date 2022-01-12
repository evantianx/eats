import { InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Generated, JoinColumn, OneToOne } from 'typeorm';
import { Common } from '../../common/entities/common.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends Common {
  @Column()
  @Generated('uuid')
  code: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
