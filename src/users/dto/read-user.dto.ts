export class ReadUserDto {
  email!: string;

  fullName!: string;

  isActive!: boolean;

  lastLoggedIn?: Date;

  createdAt!: Date;
}
