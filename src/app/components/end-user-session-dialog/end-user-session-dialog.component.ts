import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { formatTime, UserEntryModel } from 'src/app/interfaces/userEntry';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CurrentEntryData } from '../current-user-entry-table/current-user-entry-table.component';
import { UserRegistrationFormDialogComponent } from '../user-registration-form-dialog/user-registration-form-dialog.component';


@Component({
  selector: 'app-end-user-session-dialog',
  templateUrl: './end-user-session-dialog.component.html',
  styleUrls: ['./end-user-session-dialog.component.scss']
})
export class EndUserSessionDialogComponent {
  userEntryForm: FormGroup;
  showBill = new BehaviorSubject<boolean>(false);
  totalBillAmount: number;
  totalTime: number;
  timeFormat: string[] = ['AM', 'PM'];

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
      endTime_hh: '',
      endTime_mm: '',
      endTime_period: '',
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  timeConverter(hh: string, mm: string, period: string) {
    let PM = period === 'PM';
    const min = parseInt(mm, 10);
    let hour = 12;
    if (parseInt(hh, 10) !== 12) {
      hour = PM ? 12 + parseInt(hh, 10) : parseInt(hh);
    }
    return { hour, min };
  }


  endUserSession() {
    let userEntry: UserEntryModel;
    this.firebaseService.getUser(this.currentUserEntry.id).subscribe(x => {
      userEntry = x;
      userEntry.endTimeHH = this.userEntryForm.get('endTime_hh').value;
      userEntry.endTimeMM = this.userEntryForm.get('endTime_mm').value;
      userEntry.endTimePeriod = this.userEntryForm.get('endTime_period').value;
      userEntry.endTimeFormatted = formatTime(userEntry.endTimeHH, userEntry.endTimeMM, userEntry.endTimePeriod);
      if (!this.totalBillAmount && !this.totalTime) {
        this.calculateBill();
      }
      userEntry.totalPrice = this.totalBillAmount;
      userEntry.totalTime = this.totalTime;
      this.firebaseService.updateUser(this.currentUserEntry.id, userEntry);
    });
  }

  private calculateBill() {
    const startTime24Hrs = this.timeConverter(this.currentUserEntry.data.startTimeHH, this.currentUserEntry.data.startTimeMM, this.currentUserEntry.data.startTimePeriod);
    const endTimeHH = this.userEntryForm.get('endTime_hh').value;
    const endTimeMM = this.userEntryForm.get('endTime_mm').value;
    const endTimePeriod = this.userEntryForm.get('endTime_period').value;
    const endTime24Hrs = this.timeConverter(endTimeHH, endTimeMM, endTimePeriod);

    const start = new Date().setHours(startTime24Hrs.hour, startTime24Hrs.min);
    const end = new Date().setHours(endTime24Hrs.hour, endTime24Hrs.min);

    let diffrence = end - start;
    diffrence /= 1000;

    const timeInMin = diffrence / 60;
    this.totalTime = Math.floor(timeInMin);
    this.totalBillAmount = Math.ceil(timeInMin * (50 / 60));

    console.log(`time in min:`, timeInMin);
  }

  displayBill() {
    if (this.userEntryForm.get('endTime_hh').value) {
      this.calculateBill();
      this.showBill.next(true);
    }
  }
}
