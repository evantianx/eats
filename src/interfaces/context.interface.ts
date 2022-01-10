import { User } from '../user/entities/user.entity';

export interface GQLContext {
  me: User;
}
