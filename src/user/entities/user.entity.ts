import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { Common as CommonEntity } from '../../common/entities/common.entity';

enum UserRole {
  CLIENT = 'client',
  OWNER = 'owner',
  DELIVERY = 'delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CommonEntity {
  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  @Field(() => UserRole, { defaultValue: UserRole.CLIENT })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password, { hashLength: 16 });
  }
}
