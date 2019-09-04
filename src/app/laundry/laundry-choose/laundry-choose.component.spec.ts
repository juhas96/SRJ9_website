import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryChooseComponent } from './laundry-choose.component';

describe('LaundryChooseComponent', () => {
  let component: LaundryChooseComponent;
  let fixture: ComponentFixture<LaundryChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaundryChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaundryChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
