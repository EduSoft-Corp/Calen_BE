import { CreateLogDto } from './create-log.dto';

export class UpdateLogDto implements Partial<CreateLogDto> {
  userId?: string;

  entityId?: string;

  action?: string;

  affectedEntity?: string;

  hasBeenReverse?: boolean;
}
