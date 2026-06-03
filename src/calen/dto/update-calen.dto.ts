import { CreateCalenDto } from './create-calen.dto';

export class UpdateCalenDto implements Partial<CreateCalenDto> {
  content?: string;

  date?: Date;

  visible?: boolean;

  colFrom?: number;

  colTo?: number;

  rowFrom?: number;

  rowTo?: number;

  createdByUserId?: string;
}
