import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUserSessionDialogComponent } from './end-user-session-dialog.component';

describe('EndUserSessionDialogComponent', () => {
  let component: EndUserSessionDialogComponent;
  let fixture: ComponentFixture<EndUserSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndUserSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndUserSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
