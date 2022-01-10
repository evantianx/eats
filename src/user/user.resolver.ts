import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { GQLContext } from '../interfaces/context.interface';
import { LoginUserInput, LoginUserOutput } from './dtos/loginUser.dto';
import { RegisterUserInput, RegisterUserOutput } from './dtos/registerUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => Boolean)
  hello() {
    return true;
  }

  @Mutation(() => RegisterUserOutput)
  registerUser(
    @Args('input') input: RegisterUserInput,
  ): Promise<RegisterUserOutput> {
    return this.userService.registerUser(input);
  }

  @Mutation(() => LoginUserOutput)
  loginUser(@Args('input') input: LoginUserInput): Promise<LoginUserOutput> {
    return this.userService.loginUser(input);
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  me(@Context() context: GQLContext): User {
    return context.me;
  }
}
