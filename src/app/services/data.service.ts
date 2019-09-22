import { InMemoryDbService } from "angular-in-memory-web-api";
import { UserEntry } from '../interfaces/userEntry';


export class DataService implements InMemoryDbService {

    createDb() {
        const userEntries: UserEntry[] = [];
        userEntries.push({ id: "Qww3q", name: "Vipul", phone: "76342423", branchId: "@313", startTime: "10:00 AM", endTime: "12:00 PM", email: "vipul@gmail.com" })
        return {
            userEntries: userEntries
        }
    }


}