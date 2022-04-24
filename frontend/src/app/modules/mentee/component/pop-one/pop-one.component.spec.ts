import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopOneComponent } from './pop-one.component';

describe('PopOneComponent', () => {
  let component: PopOneComponent;
  let fixture: ComponentFixture<PopOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
