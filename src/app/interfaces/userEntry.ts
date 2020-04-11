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
        this.startTimeFormatted = formatTime(startTimeHH, startTimeMM, startTimePeriod);
        this.endTimeHH = endTimeHH;
        this.endTimeMM = endTimeMM;
        this.endTimePeriod = endTimePeriod;
        this.endTimeFormatted = formatTime(endTimeHH, endTimeMM, endTimePeriod);
        this.totalTime = totalTime;
        this.totalPrice = totalPrice;
        this.createdDate = new Date();
    }
}

export function formatTime(hh: string, mm: string, period: string): string {
    if (!hh && !mm && !period) {
        return '-';
    }
    hh = hh ? hh : '';
    mm = mm ? mm : '';
    period = period ? period : '';
    return `${hh}:${mm}${period}`;
}