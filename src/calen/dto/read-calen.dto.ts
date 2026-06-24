export class ReadCalenDto {
  id!: string;
  content!: string;

  date!: string;

  timeFrom!: string;

  timeTo!: string;

  visible?: boolean;

  colFrom!: number;

  colTo!: number;

  rowFrom!: number;

  rowTo!: number;

  createdByUserId!: string;
}
