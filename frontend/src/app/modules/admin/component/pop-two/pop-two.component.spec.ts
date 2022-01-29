import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopTwoComponent } from './pop-two.component';

describe('PopTwoComponent', () => {
  let component: PopTwoComponent;
  let fixture: ComponentFixture<PopTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
