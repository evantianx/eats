import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, Generated, JoinColumn, OneToOne } from 'typeorm';
import { Common as CommonEntity } from '../../common/entities/common.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CommonEntity {
  @Column()
  @Field(() => String)
  @Generated('uuid')
  code: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @Field(() => User)
  @JoinColumn()
  user: User;
}
