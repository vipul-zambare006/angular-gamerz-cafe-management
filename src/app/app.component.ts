import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserRegistrationFormDialogComponent } from './components/user-registration-form-dialog/user-registration-form-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-cyber-cafe-management';

  constructor(public dialog: MatDialog, private router: ActivatedRoute){
  }

  openUserRegitrationForm(){
    const dialogRef = this.dialog.open(UserRegistrationFormDialogComponent, {
      width: '600px',
      height: '600px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
