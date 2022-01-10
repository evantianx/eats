import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { Output } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ObjectType()
export class EditUserOutput extends Output {}

@InputType()
export class EditUserInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}
