import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserEntryTableComponent } from './current-user-entry-table.component';

describe('CurrentUserEntryTableComponent', () => {
  let component: CurrentUserEntryTableComponent;
  let fixture: ComponentFixture<CurrentUserEntryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUserEntryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUserEntryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
