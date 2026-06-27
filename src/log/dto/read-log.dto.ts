export class ReadLogDto {
  id!: string;

  userId!: string;

  entityId!: string;

  action!: string;

  affectedEntity!: string;

  hasBeenReverse!: boolean;

  createdAt!: Date;

  updatedAt!: Date;
}
