import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserEntryModel } from 'src/app/interfaces/userEntry';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CurrentEntryData } from '../current-user-entry-table/current-user-entry-table.component';

@Component({
  selector: 'app-user-registration-form-dialog',
  templateUrl: './user-registration-form-dialog.component.html',
  styleUrls: ['./user-registration-form-dialog.component.scss']
})
export class UserRegistrationFormDialogComponent {
  userEntryForm: FormGroup;

  timeFormat: string[] = ['AM', 'PM']

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public currentUserEntry: CurrentEntryData,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService) {

    this.userEntryForm = this.formBuilder.group({
      branchId: '',
      name: '',
      phone: '',
      email: '',
      startTime_hh: '',
      startTime_mm: '',
      startTime_period: '',
    });

    if (currentUserEntry && currentUserEntry.data) {
      this.userEntryForm.setValue({
        branchId: currentUserEntry.data.branchId,
        name: currentUserEntry.data.name,
        phone: currentUserEntry.data.phone,
        email: currentUserEntry.data.email,
        startTime_hh: currentUserEntry.data.startTimeHH ? currentUserEntry.data.startTimeHH : '',
        startTime_mm: currentUserEntry.data.startTimeMM ? currentUserEntry.data.startTimeMM : '',
        startTime_period: currentUserEntry.data.startTimePeriod ? currentUserEntry.data.startTimePeriod : '',
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  doUserEntry() {
    debugger
    const userEntry = new UserEntryModel(
      this.userEntryForm.get('branchId').value,
      this.userEntryForm.get('name').value,
      this.userEntryForm.get('phone').value,
      this.userEntryForm.get('email').value,
      this.userEntryForm.get('startTime_hh').value,
      this.userEntryForm.get('startTime_mm').value,
      this.userEntryForm.get('startTime_period').value
    )

    for (let [key, value] of Object.entries(userEntry)) {
      if (!value) {
        userEntry[key] = '';
      }
    }

    if (this.currentUserEntry) {
      userEntry.id = this.currentUserEntry.id;
      this.firebaseService.updateUser(this.currentUserEntry.id, userEntry);
    } else {
      this.firebaseService.createUser(userEntry);
    }
    this.displayUsers();
  }


  displayUsers() {
    this.firebaseService.getAllUserEntry().subscribe((userEntries) => {
      const datasource = [];
      userEntries.forEach(x => {
        const user: UserEntryModel = x.payload.doc.data() as UserEntryModel;
        datasource.push({
          id: x.payload.doc.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          startTime: user.startTimeFormatted,
          branchId: user.branchId,
          endTime: user.endTimeHH ? user.endTimeFormatted : '-',
        });
      });
    });
  }

  deleteUserEntry(userKey: string) {
  }
}
