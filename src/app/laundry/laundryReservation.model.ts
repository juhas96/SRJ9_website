export interface LaundryReservation {
  id: bigint;
  reservation_number: string;
  date: Date;
  time_from: Date;
  time_until: Date;
  status: 'RESERVED' | 'STARTED' | 'CLOSED';
  washing_machine_number: bigint;
}
