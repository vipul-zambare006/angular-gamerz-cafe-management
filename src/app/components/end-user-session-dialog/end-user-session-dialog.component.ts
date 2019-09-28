import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserRegistrationFormDialogComponent } from '../user-registration-form-dialog/user-registration-form-dialog.component';
import { UserEntry } from 'src/app/interfaces/userEntry';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-end-user-session-dialog',
  templateUrl: './end-user-session-dialog.component.html',
  styleUrls: ['./end-user-session-dialog.component.scss']
})
export class EndUserSessionDialogComponent implements OnInit {
  userEntryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserEntry,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private appService: AppService) {

    this.userEntryForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      startTime: '',
      endTime: ''
    });

    if (data) {
      this.userEntryForm.setValue({
        name: data.name,
        phone: data.phone,
        // branchId: data.branchId,
        email: data.email,
        startTime: data.startTime,
        endTime: ''
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }
  endUserSession() {
    this.firebaseService.updateUser(this.data.id, this.userEntryForm.value)
  }
}
