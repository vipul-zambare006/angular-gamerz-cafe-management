// export interface UserEntry {
//     id?: string;
//     branchId: string;
//     name: string;
//     phone: string;
//     email: string;

//     startTime_hh?: string;
//     startTime_mm?: string;
//     startTime_period?: string;

//     endTime_hh?: string;
//     endTime_mm?: string;
//     endTime_period?: string;

//     createdDate: Date;
//     totalTime?: number;
//     totalPrice?: number;
// }

export class UserEntryModel {
    id?: string;
    branchId: string;
    name: string;
    phone: string;
    email: string;

    startTimeHH: string;
    startTimeMM: string;
    startTimePeriod: string;
    startTimeFormatted?: string;

    endTimeHH?: string;
    endTimeMM?: string;
    endTimePeriod?: string;
    endTimeFormatted?: string;

    totalTime?: number;
    totalPrice?: number;
    createdDate: Date;

    constructor(
        branchId: string,
        name: string,
        phone: string,
        email: string,
        startTimeHH: string,
        startTimeMM: string,
        startTimePeriod: string,
        id?: string,
        endTimeHH?: string,
        endTimeMM?: string,
        endTimePeriod?: string,
        totalTime?: number,
        totalPrice?: number
    ) {
        this.id = id;
        this.branchId = branchId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.startTimeHH = startTimeHH;
        this.startTimeMM = startTimeMM;
        this.startTimePeriod = startTimePeriod;
        this.startTimeFormatted = this.formatTime(startTimeHH, startTimeMM, startTimePeriod);
        this.endTimeHH = endTimeHH;
        this.endTimeMM = endTimeMM;
        this.endTimePeriod = endTimePeriod;
        this.endTimeFormatted = this.formatTime(endTimeHH, endTimeMM, endTimePeriod);
        this.totalTime = totalTime;
        this.totalPrice = totalPrice;
        this.createdDate = new Date();
    }

    formatTime(hh: string, mm: string, period: string): string {
        return `${hh}:${mm}${period}`;
    }
}
