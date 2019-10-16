import { Timestamp } from './timestamp';


export class GymReservation {
    public id: Number;
    public reservation_number: String;
    public date: String;
    public time_from: Timestamp[];
    public time_until: Timestamp[];
    public status: String;
    public gym_number: Number;
}
