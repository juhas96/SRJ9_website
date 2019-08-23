import {Status} from '../enums/status.enum';

export interface Laundry {
  id?: number;
  reservation_number?: string;
  date: Date;
  time_from: Date;
  time_until: Date;
  status?: Status;
  washing_machine_number?: number;
}
