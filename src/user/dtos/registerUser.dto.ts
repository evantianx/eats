import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Output } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class RegisterUserInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
export class RegisterUserOutput extends Output {}
