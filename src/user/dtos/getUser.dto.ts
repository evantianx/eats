import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Output } from '../../common/dtos/output.dto';
import { User } from '../entities/user.entity';

@ArgsType()
export class GetUserInput {
  @Field(() => Number)
  id: number;
}

@ObjectType()
export class GetUserOutput extends Output {
  @Field(() => User, { nullable: true })
  user?: User;
}
