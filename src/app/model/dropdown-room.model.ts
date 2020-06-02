export class DropdownRoom {
    // BLOK
    value: string;
    label: string;
    children: [
        {
            // POSCHODIE
            value: string,
            label: string,
            children: [{
                // IZBA
                value: string,
                label: string,
                isLeaf: true,
                capacity: number
            }?]
        }?,
    ];
}
