import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

export interface DialogData{
  name: string;
}

@Component({
  selector: 'app-user-registration-form-dialog',
  templateUrl: './user-registration-form-dialog.component.html',
  styleUrls: ['./user-registration-form-dialog.component.scss']
})
export class UserRegistrationFormDialogComponent implements OnInit {
  userEntryForm: FormGroup;



  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private appService: AppService) {
      
  this.userEntryForm = this.formBuilder.group({
    name: '',
    phone: '',
    email: '',
    startTime: ''
  });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
