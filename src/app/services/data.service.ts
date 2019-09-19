import {InMemoryDbService} from "angular-in-memory-web-api";
import { UserEntry } from '../interfaces/userEntry';


export class DataService implements InMemoryDbService{
    
    createDb() {
        let userEntries: UserEntry[] = []
        userEntries.push({id: 1212, name: "Vipul", phone:"76342423", branchId:1, startTime:"10:00 AM", endTime:"12:00 PM", email:"vipul@gmail.com" })
        return {
            userEntries: userEntries
        }
    }


}