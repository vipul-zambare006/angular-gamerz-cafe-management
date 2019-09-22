import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { UserEntry } from 'src/app/interfaces/userEntry';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  userEntryForm: FormGroup;
  displayedColumns: string[] = ['name', 'phone', 'email', 'startTime', 'endTime'];
  userDataSource: UserEntry[] = [];

  constructor(private formBuilder: FormBuilder, private appService: AppService) {
    this.userEntryForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      startTime: ''
    });

  }

  ngOnInit() {
    this.appService.getTasks().subscribe((userEntries: UserEntry[]) => {
      this.userDataSource = userEntries;
      console.log(this.userDataSource)
    })
  }

  doUserEntry() {
    this.userDataSource.push(this.userEntryForm.value);
    this.appService.createUserEntry(this.userEntryForm.value).subscribe((x)=>{
      console.log('new reocrd:',x);
    });
  }

  displayUsers(){
   
  }


}
