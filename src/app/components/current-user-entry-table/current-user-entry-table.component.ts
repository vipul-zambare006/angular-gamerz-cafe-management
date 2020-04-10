import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserEntry } from 'src/app/interfaces/userEntry';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormDialogComponent } from '../user-registration-form-dialog/user-registration-form-dialog.component';
import { EndUserSessionDialogComponent } from '../end-user-session-dialog/end-user-session-dialog.component';

@Component({
  selector: 'app-current-user-entry-table',
  templateUrl: './current-user-entry-table.component.html',
  styleUrls: ['./current-user-entry-table.component.scss']
})
export class CurrentUserEntryTableComponent implements OnInit {

  _isHistoryTable: boolean;
  get isHistoryTable(): boolean {
    return this._isHistoryTable;
  }

  @Input('isHistoryTable')
  set isHistoryTable(value: boolean) {
    this._isHistoryTable = value;
    this.setTableColumns();
  }

  userEntryForm: FormGroup;
  displayedColumns: string[];
  userDataSource: UserEntry[] = [];
  tableTitle: string;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    public dialog: MatDialog) {
    this.userEntryForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      startTime: ''
    });
    this.setTableColumns();
  }

  setTableColumns() {
    this.displayedColumns = [];
    if (this.isHistoryTable) {
      this.displayedColumns = ['branchId', 'name', 'phone', 'email', 'startTime', 'endTime', 'totalTime', 'totalPrice']
      this.tableTitle = `Users entries on ${new Date(Date.now()).toLocaleString().split(',')[0]}: `;
    } else {
      this.displayedColumns = ['branchId', 'name', 'phone', 'email', 'startTime', 'endTime', 'edit', 'delete'];
      this.tableTitle = 'Current logged in users: ';
    }
  }

  ngOnInit() {
    this.displayUsers();
  }

  doUserEntry() {
    this.firebaseService.createUser(this.userEntryForm.value);
    this.displayUsers();
  }

  formatTime(hr: string, min: string, period: string): string {
    return `${hr}:${min} ${period}`;
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
          endTime: user.endTime_hh ? this.formatTime(user.endTime_hh, user.endTime_mm, user.endTime_period) : "-",
          totalTime: user.totalTime,
          totalPrice: user.totalPrice
        });
      });

      if (this.isHistoryTable) {
        this.userDataSource = datasource.filter((x) => x.endTime);
      } else {
        this.userDataSource = datasource.filter((x) => x.endTime === '-');
      }
    });
  }

  openEditUserEntryDialoge(userEntry: UserEntry) {
    const dialogRef = this.dialog.open(UserRegistrationFormDialogComponent, {
      width: '600px',
      height: '600px',
      data: userEntry
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openEndSessionDialog(userEntry: UserEntry) {
    const dialogRef = this.dialog.open(EndUserSessionDialogComponent, {
      width: '600px',
      height: '400px',
      data: userEntry
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
