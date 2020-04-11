import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserEntryModel } from 'src/app/interfaces/userEntry';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    @Inject(MAT_DIALOG_DATA) public data: UserEntryModel,
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
        startTime_hh: data.startTimeHH ? data.startTimeHH : '',
        startTime_mm: data.startTimeMM ? data.startTimeMM : '',
        startTime_period: data.startTimePeriod ? data.startTimePeriod : '',
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
    const userEntry = new UserEntryModel(
      this.userEntryForm.get('branchId').value,
      this.userEntryForm.get('name').value,
      this.userEntryForm.get('phone').value,
      this.userEntryForm.get('email').value,
      this.userEntryForm.get('startTime_hh').value,
      this.userEntryForm.get('startTime_mm').value,
      this.userEntryForm.get('startTime_period').value
    )

    if (this.data) {
      this.firebaseService.updateUser(this.data.id, userEntry);
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
