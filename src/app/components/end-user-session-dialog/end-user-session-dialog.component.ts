import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserRegistrationFormDialogComponent } from '../user-registration-form-dialog/user-registration-form-dialog.component';
import { UserEntry } from 'src/app/interfaces/userEntry';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-end-user-session-dialog',
  templateUrl: './end-user-session-dialog.component.html',
  styleUrls: ['./end-user-session-dialog.component.scss']
})
export class EndUserSessionDialogComponent implements OnInit {
  userEntryForm: FormGroup;
  showBill = new BehaviorSubject<boolean>(false);
  timeFormat: string[] = ['AM', 'PM']

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService) {

    this.userEntryForm = this.formBuilder.group({
      branchId: '',
      name: '',
      phone: '',
      email: '',
      endTime_hh: '',
      endTime_mm: '',
      endTime_period: '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  timeConvertor(time) {
    let PM = time.match('PM') ? true : false;
    time = time.split(':');
    let min = time[1];
    let hour = 0;

    if (PM) {
      hour = 12 + parseInt(time[0], 10)
      // let sec = time[2].replace('PM', '')
    } else {
      hour = time[0]
      // let sec = time[2].replace('AM', '')
    }
    return { hour, min };
    // console.log(hour + ':' + min + ':' + sec)
  }

  endUserSession() {
    let userEntry: UserEntry;
    this.firebaseService.getUser(this.data.id).subscribe(x => {
      userEntry = x;
      userEntry.endTime_hh = this.userEntryForm.get('endTime_hh').value;
      userEntry.endTime_mm = this.userEntryForm.get('endTime_mm').value;
      userEntry.endTime_period = this.userEntryForm.get('endTime_period').value;


      const startTime24Hrs = this.timeConvertor(this.data.startTime);
      const endTime24Hrs = this.timeConvertor(`${userEntry.endTime_hh}:${userEntry.endTime_mm}${userEntry.endTime_period}`);

      let start = new Date().setHours(startTime24Hrs.hour, startTime24Hrs.min);
      let end = new Date().setHours(endTime24Hrs.hour, endTime24Hrs.min);
      let diffrence = end - start;

      diffrence /= 1000;

      const timeInMin = diffrence / 60;
      userEntry.totalTime = timeInMin;
      console.log(`time in min:`, timeInMin);

      this.firebaseService.updateUser(this.data.id, userEntry);
    });
  }

  calculateBill() {
    this.showBill.next(true);
  }
}
