import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyOneComponent } from './notify-one.component';

describe('NotifyOneComponent', () => {
  let component: NotifyOneComponent;
  let fixture: ComponentFixture<NotifyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
