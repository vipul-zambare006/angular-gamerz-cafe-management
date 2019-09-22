import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public db: AngularFirestore) { }

    getUser(userKey) {
        return this.db.collection('UserEntry').doc(userKey).snapshotChanges();
    }

    updateUser(userKey, value) {
        value.nameToSearch = value.name.toLowerCase();
        return this.db.collection('UserEntry').doc(userKey).set(value);
    }

    deleteUser(userKey) {
        return this.db.collection('UserEntry').doc(userKey).delete();
    }

    getUserEntry() {
        return this.db.collection('UserEntry').snapshotChanges();
    }

    // searchUserEntry(searchValue) {
    //     return this.db.collection('UserEntry', ref => ref.where('nameToSearch', '>=', searchValue)
    //         .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    //         .snapshotChanges()
    // }

    // searchUserEntryByAge(value) {
    //     return this.db.collection('UserEntry', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
    // }


    createUser(value) {
        debugger;
        return this.db.collection('Cybercafe.UserEntry').add({
            // name: value.name,
            // nameToSearch: value.name.toLowerCase(),
            // surname: value.surname,
            // age: parseInt(value.age),
            // avatar: avatar
            branchId: 1,
            name: value.name,
            phone: value.phone,
            email: value.email,
            startTime: value.startTime,
            endTime: '3:00 PM'
        });
    }
}