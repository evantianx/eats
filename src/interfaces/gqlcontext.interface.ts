import { User } from '../user/entities/user.entity';

export interface GqlContext {
  me: User;
}
