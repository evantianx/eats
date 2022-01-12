import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Output } from '../../common/dtos/output.dto';
import { Verification } from '../entities/verification.entity';

@InputType()
export class VerifyUserInput extends PickType(Verification, ['code']) {}

@ObjectType()
export class VerifyUserOutput extends Output {}
