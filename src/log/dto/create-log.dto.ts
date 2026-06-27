export class CreateLogDto {
  userId!: string;

  entityId!: string;

  action!: string;

  affectedEntity!: string;

  hasBeenReverse?: boolean;
}
