export class ReadLogDto {
  id!: string;

  userId!: string;

  entityId!: string;

  action!: string;

  affectedEntity!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

export class ReadDetailLogDto extends ReadLogDto {
  userName!: string;
}
