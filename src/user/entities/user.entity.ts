import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import * as argon2 from 'argon2';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
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
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field(() => String)
  @IsString()
  @Length(8, 20)
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  @Field(() => UserRole, { defaultValue: UserRole.CLIENT })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field(() => Boolean, { defaultValue: false })
  verified: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await argon2.hash(this.password, { hashLength: 16 });
    }
  }

  async comparePassword(password: string): Promise<boolean> {
    return await argon2.verify(this.password, password);
  }
}
