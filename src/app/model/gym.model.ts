import { Timestamp } from './timestamp';


export class GymReservation {
    public id: number;
    public reservation_number: string;
    public date: Date;
    public time_from: Timestamp[];
    public time_until: Timestamp[];
    public status: string;
    public gym_number: number;
}
