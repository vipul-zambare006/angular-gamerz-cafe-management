import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserEntry } from 'src/app/interfaces/userEntry';

@Component({
  selector: 'app-user-registration-form-dialog',
  templateUrl: './user-registration-form-dialog.component.html',
  styleUrls: ['./user-registration-form-dialog.component.scss']
})
export class UserRegistrationFormDialogComponent implements OnInit {
  userEntryForm: FormGroup;

  timeFormat: string[] = ['AM', 'PM']

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserEntry,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private appService: AppService) {


    this.userEntryForm = this.formBuilder.group({
      branchId: '',
      name: '',
      phone: '',
      email: '',
      startTime_hh: '',
      startTime_mm: '',
      startTime_period: '',
    });

    if (data) {
      this.userEntryForm.setValue({
        branchId: data.branchId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        startTime_hh: data.startTime_hh,
        startTime_mm: data.startTime_mm,
        startTime_period: data.startTime_period,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  formatTime(hr: string, min: string, period: string): string {
    return `${hr}:${min} ${period}`;
  }

  doUserEntry() {
    let newUserEntry: UserEntry = {
      branchId: this.userEntryForm.get('branchId').value,
      name: this.userEntryForm.get('name').value,
      phone: this.userEntryForm.get('phone').value,
      email: this.userEntryForm.get('email').value,
      startTime_hh: this.userEntryForm.get('startTime_hh').value,
      startTime_mm: this.userEntryForm.get('startTime_mm').value,
      startTime_period: this.userEntryForm.get('startTime_period').value,
      createdDate: new Date(),
    }

    if (this.data) {
      this.firebaseService.updateUser(this.data.id, newUserEntry);
    } else {
      this.firebaseService.createUser(newUserEntry);
    }
    this.displayUsers();
  }


  displayUsers() {
    this.firebaseService.getAllUserEntry().subscribe((userEntries) => {
      const datasource = [];
      userEntries.forEach(x => {
        const user: UserEntry = x.payload.doc.data() as UserEntry;
        datasource.push({
          id: x.payload.doc.id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          startTime: this.formatTime(user.startTime_hh, user.startTime_mm, user.startTime_period),
          branchId: user.branchId,
          endTime: user.endTime_hh ? this.formatTime(user.endTime_hh, user.endTime_mm, user.endTime_period) : '-',
        });
      });
    });
  }

  deleteUserEntry(userKey: string) {
  }
}
