import { Timestamp } from './timestamp';
import { User } from './user.model';


export class GymReservation {
    public id: number;
    public reservation_number: string;
    public date: string;
    public time_from: string;
    public time_until: string;
    public status: string;
    public gym_number: number;
    public user: User;
}
