import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntry } from '../interfaces/userEntry';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public db: AngularFirestore) { }

    getUser(userKey) {
        return this.db.collection('UserEntry').doc(userKey).snapshotChanges();
    }

    updateUser(userKey, value: UserEntry) {
        // value.nameToSearch = value.name.toLowerCase();
        return this.db.collection('UserEntry').doc(userKey).set(value);
    }

    deleteUser(userKey) {
        return this.db.collection('UserEntry').doc(userKey).delete();
    }

    getAllUserEntry() {
        // return this.db.collection('UserEntry').valueChanges(); //this will return me just data 
        return this.db.collection('UserEntry').snapshotChanges()
    }

    // searchUserEntry(searchValue) {
    //     return this.db.collection('UserEntry', ref => ref.where('nameToSearch', '>=', searchValue)
    //         .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    //         .snapshotChanges()
    // }

    // searchUserEntryByAge(value) {
    //     return this.db.collection('UserEntry', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
    // }


    createUser(userEntry: UserEntry) {
        debugger;
        return this.db.collection('UserEntry').add(userEntry);
    }
}