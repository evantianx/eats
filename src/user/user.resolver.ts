import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/authUser.decorator';
import { EditUserInput, EditUserOutput } from './dtos/editUser.dto';
import { GetUserInput, GetUserOutput } from './dtos/getUser.dto';
import { LoginUserInput, LoginUserOutput } from './dtos/loginUser.dto';
import { RegisterUserInput, RegisterUserOutput } from './dtos/registerUser.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  @UseGuards(AuthGuard)
  getMe(@AuthUser() me: User): User {
    return me;
  }

  @Query(() => GetUserOutput)
  @UseGuards(AuthGuard)
  getUser(@Args() { id }: GetUserInput): Promise<GetUserOutput> {
    return this.userService.findUserById(id);
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

  @Mutation(() => EditUserOutput)
  @UseGuards(AuthGuard)
  editUser(
    @AuthUser() { id }: User,
    @Args('input')
    input: EditUserInput,
  ): Promise<EditUserOutput> {
    return this.userService.editUser(id, input);
  }
}
