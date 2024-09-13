import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurUsersComponent } from './our-users.component';

describe('OurUsersComponent', () => {
  let component: OurUsersComponent;
  let fixture: ComponentFixture<OurUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
