import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserEntry } from 'src/app/interfaces/userEntry';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { UserRegistrationFormDialogComponent } from '../user-registration-form-dialog/user-registration-form-dialog.component';
import { EndUserSessionDialogComponent } from '../end-user-session-dialog/end-user-session-dialog.component';

@Component({
  selector: 'app-current-user-entry-table',
  templateUrl: './current-user-entry-table.component.html',
  styleUrls: ['./current-user-entry-table.component.scss']
})
export class CurrentUserEntryTableComponent implements OnInit {

  userEntryForm: FormGroup;
  displayedColumns: string[] = ['name', 'phone', 'email', 'startTime', 'endTime', 'edit', 'delete'];
  userDataSource: UserEntry[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private appService: AppService,
    public dialog: MatDialog) {
    this.userEntryForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      startTime: ''
    });

  }

  ngOnInit() {
    // this.userDataSource = [{
    //   id: '12121',
    //   name: "Vipul",
    //   phone: "QWeqeq",
    //   email: "user.email",
    //   startTime: "user.startTime",
    //   branchId: "user.branchId",
    //   endTime: "user.endTime"
    // }]
    this.displayUsers();
  }

  doUserEntry() {
    this.firebaseService.createUser(this.userEntryForm.value);
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
      this.userDataSource = datasource;
    });
  }

  editUserEntry(userKey: string) {
    console.log(userKey);
  }

  deleteUserEntry(userKey: string) {
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
      height: '600px',
      data: userEntry
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
