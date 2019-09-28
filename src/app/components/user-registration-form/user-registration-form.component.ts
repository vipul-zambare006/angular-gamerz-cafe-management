import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppService } from 'src/app/app.service';
import { UserEntry } from 'src/app/interfaces/userEntry';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  userEntryForm: FormGroup;
  displayedColumns: string[] = ['name', 'phone', 'email', 'startTime', 'endTime', 'edit', 'delete'];
  userDataSource: UserEntry[] = [];

  constructor(
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
   // this.displayUsers();
  }

  doUserEntry() {
    this.firebaseService.createUser(this.userEntryForm.value);
    // this.displayUsers();
  }

  // displayUsers() {
  //   this.firebaseService.getAllUserEntry().subscribe((userEntries) => {
  //     const datasource = [];
  //     userEntries.forEach(x => {
  //       const user: UserEntry = x.payload.doc.data() as UserEntry;
  //       datasource.push({
  //         id: x.payload.doc.id,
  //         name: user.name,
  //         phone: user.phone,
  //         email: user.email,
  //         startTime: user.startTime,
  //         branchId: user.branchId,
  //         endTime: user.endTime
  //       });
  //     });
  //     this.userDataSource = datasource;
  //   });
  // }

  editUserEntry(userKey: string) {
    console.log(userKey);
  }

  deleteUserEntry(userKey: string) {
  }
}
