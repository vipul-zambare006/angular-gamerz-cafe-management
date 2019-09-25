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
      startTime: ''
    });

    if (data) {
      this.userEntryForm.setValue({
        name: data.name,
        phone: data.phone,
        // branchId: data.branchId,
        email: data.email,
        startTime: data.startTime,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  doUserEntry() {
    if (this.data) {
      this.firebaseService.updateUser(this.data.id, this.userEntryForm.value);
    } else {
      this.firebaseService.createUser(this.userEntryForm.value);
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
          startTime: user.startTime,
          branchId: user.branchId,
          endTime: user.endTime
        });
      });
    });
  }

  deleteUserEntry(userKey: string) {
  }
}
