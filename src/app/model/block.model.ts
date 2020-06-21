import {Floor} from './floor.model';
import {NzCascaderOption} from 'ng-zorro-antd';

export class Block {
    value: string;
    label: string;
    children: NzCascaderOption[];

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
        this.children = [];
    }


}
