export interface UserEntry {
    id?: string;
    branchId: string;
    name: string;
    phone: string;
    email: string;

    startTime_hh?: string;
    startTime_mm?: string;
    startTime_period?: string;

    endTime_hh?: string;
    endTime_mm?: string;
    endTime_period?: string;

    createdDate: Date;
    totalTime?: number;
    totalPrice?: number;
}
