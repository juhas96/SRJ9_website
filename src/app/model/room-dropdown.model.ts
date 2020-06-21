export class RoomDropdown {
    value: string;
    label: string;
    isLeaf: boolean;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
        this.isLeaf = true;
    }
}
