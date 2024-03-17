export interface Race {
    name: string;
    desc: string;
    asi: {
        attributes: string[];
        value: number;
    }[];
}
