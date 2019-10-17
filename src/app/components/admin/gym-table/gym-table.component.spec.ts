import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GymTableComponent } from './gym-table.component';

describe('GymTableComponent', () => {
  let component: GymTableComponent;
  let fixture: ComponentFixture<GymTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GymTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GymTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
