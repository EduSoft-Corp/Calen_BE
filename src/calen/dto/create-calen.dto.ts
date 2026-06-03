export class CreateCalenDto {
  content!: string;

  date!: Date;

  visible?: boolean;

  colFrom!: number;

  colTo!: number;

  rowFrom!: number;

  rowTo!: number;

  createdByUserId!: string;
}
