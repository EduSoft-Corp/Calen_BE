import { CreateCalenDto } from './create-calen.dto';

export class UpdateCalenDto implements Partial<CreateCalenDto> {
  content?: string;

  date!: string;

  timeFrom!: string;

  timeTo!: string;

  visible?: boolean;

  colFrom?: number;

  colTo?: number;

  rowFrom?: number;

  rowTo?: number;

  createdByUserId?: string;
}
