export interface IProcess {
    priority: number;
    user: string;
    command: string;
    process_id: number;
    cpu_usage_percent: number;
    memory_usage_percent: number;
}