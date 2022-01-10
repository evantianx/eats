import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/authUser.decorator';
import { LoginUserInput, LoginUserOutput } from './dtos/loginUser.dto';
import { RegisterUserInput, RegisterUserOutput } from './dtos/registerUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
  getMe(@AuthUser() me: User): User {
    return me;
  }
}
