import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntryModel } from '../interfaces/userEntry';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public db: AngularFirestore) { }

    getUser(userKey: string): Observable<UserEntryModel> {
        return this.db.collection('UserEntry').doc(userKey).valueChanges() as Observable<UserEntryModel>;
    }

    updateUser(userKey: string, value: UserEntryModel) {
        return this.db.collection('UserEntry').doc(userKey).set(value);
    }

    deleteUser(userKey: string) {
        return this.db.collection('UserEntry').doc(userKey).delete();
    }

    getAllUserEntry() {
        // return this.db.collection('UserEntry').valueChanges(); //this will return me just data 
        return this.db.collection('UserEntry').snapshotChanges();
    }

    deleteAllUserEntries() {
        this.getAllUserEntry().subscribe((userEntries) => {
            userEntries.forEach(x => {
                this.deleteUser(x.payload.doc.id);
            });
        });
    }

    // searchUserEntry(searchValue) {
    //     return this.db.collection('UserEntry', ref => ref.where('nameToSearch', '>=', searchValue)
    //         .where('nameToSearch', '<=', searchValue + '\uf8ff'))
    //         .snapshotChanges()
    // }

    // searchUserEntryByAge(value) {
    //     return this.db.collection('UserEntry', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
    // }

    createUser(userEntry: UserEntryModel) {
        console.log(userEntry);
        return this.db.collection('UserEntry').add(JSON.parse(JSON.stringify(userEntry)));
    }
}
