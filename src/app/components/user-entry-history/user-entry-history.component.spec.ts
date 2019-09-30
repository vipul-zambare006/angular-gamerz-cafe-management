import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEntryHistoryComponent } from './user-entry-history.component';

describe('UserEntryHistoryComponent', () => {
  let component: UserEntryHistoryComponent;
  let fixture: ComponentFixture<UserEntryHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEntryHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEntryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
