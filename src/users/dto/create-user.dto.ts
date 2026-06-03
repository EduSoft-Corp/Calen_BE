export class CreateUserDto {
  email!: string;

  password!: string;

  fullName!: string;

  isActive?: boolean;
}
