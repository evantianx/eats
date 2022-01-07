import { Column, Entity } from 'typeorm';
import { Common as CommonEntity } from '../../common/entities/common.entity';

enum UserRole {
  CLIENT = 'client',
  OWNER = 'owner',
  DELIVERY = 'delivery',
}

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;
}
