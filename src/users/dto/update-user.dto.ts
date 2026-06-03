import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto implements Partial<CreateUserDto> {
  email?: string;

  password?: string;

  fullName?: string;

  isActive?: boolean;
}
