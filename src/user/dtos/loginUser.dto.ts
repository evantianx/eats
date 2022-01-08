import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Output } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class LoginUserInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginUserOutput extends Output {
  @Field(() => String, { nullable: true })
  token?: string;
}
