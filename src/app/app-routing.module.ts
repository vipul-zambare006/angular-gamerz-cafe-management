import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEntryHistoryComponent } from './components/user-entry-history/user-entry-history.component';
import { CurrentUserEntryTableComponent } from './components/current-user-entry-table/current-user-entry-table.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },{
  path:'dashboard',
  component: CurrentUserEntryTableComponent
},{
  path:'user-entry-history',
  component: UserEntryHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
