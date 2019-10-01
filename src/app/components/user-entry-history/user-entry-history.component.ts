import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-user-entry-history',
  templateUrl: './user-entry-history.component.html',
  styleUrls: ['./user-entry-history.component.scss']
})
export class UserEntryHistoryComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) { }
  ngOnInit() { }

  deleteAllUsers() {
    return this.firebaseService.deleteAllUserEntries();
  }
}
