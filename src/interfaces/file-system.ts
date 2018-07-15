export interface IFileSystem {
    all_capacity: number;
    used_capacity: number;
    available_capacity: number;
    used_percent: number;
    disc_name: string;
    type: string;
}