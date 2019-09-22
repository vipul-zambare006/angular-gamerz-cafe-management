import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  userEntryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public firebaseService: FirebaseService) {
    this.userEntryForm = this.formBuilder.group({
      name: '',
      phone: '',
      email: '',
      startTime: ''
    });

  }

  ngOnInit() {
  }

  doUserEntry() {
    this.firebaseService.createUser(this.userEntryForm.value);
  }

}
