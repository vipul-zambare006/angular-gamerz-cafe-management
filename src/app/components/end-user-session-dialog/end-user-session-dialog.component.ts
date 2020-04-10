import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserRegistrationFormDialogComponent } from '../user-registration-form-dialog/user-registration-form-dialog.component';
import { UserEntry } from 'src/app/interfaces/userEntry';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-end-user-session-dialog',
  templateUrl: './end-user-session-dialog.component.html',
  styleUrls: ['./end-user-session-dialog.component.scss']
})
export class EndUserSessionDialogComponent implements OnInit {
  userEntryForm: FormGroup;
  showBill = new BehaviorSubject<boolean>(false);
  totalBillAmount: number;
  totalTime: number;
  timeFormat: string[] = ['AM', 'PM'];

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
    const timeString: string[] = time.split(' ');
    const PM = timeString[1].match('PM') ? true : false;
    time = timeString[0].split(':');
    const min = parseInt(time[1], 10);
    let hour = 12;
    if (parseInt(time[0], 10) !== 12) {
      hour = PM ? 12 + parseInt(time[0], 10) : time[0];
    }
    return { hour, min };
  }

  endUserSession() {
    let userEntry: UserEntry;
    this.firebaseService.getUser(this.data.id).subscribe(x => {
      userEntry = x;
      userEntry.endTime_hh = this.userEntryForm.get('endTime_hh').value;
      userEntry.endTime_mm = this.userEntryForm.get('endTime_mm').value;
      userEntry.endTime_period = this.userEntryForm.get('endTime_period').value;
      this.calculateBill();
      userEntry.totalPrice = this.totalBillAmount;
      userEntry.totalTime = this.totalTime;
      this.firebaseService.updateUser(this.data.id, userEntry);
    });
  }

  private calculateBill() {
    const startTime24Hrs = this.timeConvertor(this.data.startTime);
    const endTimeHH = this.userEntryForm.get('endTime_hh').value;
    const endTimeMM = this.userEntryForm.get('endTime_mm').value;
    const endTimePeriod = this.userEntryForm.get('endTime_period').value;

    const endTime24Hrs = this.timeConvertor(`${endTimeHH}:${endTimeMM} ${endTimePeriod}`);

    const start = new Date().setHours(startTime24Hrs.hour, startTime24Hrs.min);
    const end = new Date().setHours(endTime24Hrs.hour, endTime24Hrs.min);

    let diffrence = end - start;
    diffrence /= 1000;

    const timeInMin = diffrence / 60;
    this.totalTime = Math.floor(timeInMin);
    this.totalBillAmount = timeInMin * (50 / 60);

    console.log(`time in min:`, timeInMin);
  }

  displayBill() {
    if (this.userEntryForm.get('endTime_hh').value) {
      this.calculateBill();
      this.showBill.next(true);
    }
  }
}
