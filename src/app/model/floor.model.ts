import {RoomDropdown} from './room-dropdown.model';
import {NzCascaderOption} from 'ng-zorro-antd';

export class Floor {
    value: string;
    label: string;
    children: NzCascaderOption[] = [];

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}
