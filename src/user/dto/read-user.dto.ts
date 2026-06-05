export class ReadUserDto {
  id!: string;
  
  email!: string;

  fullName!: string;

  isActive!: boolean;

  lastLoggedIn?: Date;

  createdAt!: Date;
}
