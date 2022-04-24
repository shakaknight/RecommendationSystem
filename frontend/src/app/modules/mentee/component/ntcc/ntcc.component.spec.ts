import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtccComponent } from './ntcc.component';

describe('NtccComponent', () => {
  let component: NtccComponent;
  let fixture: ComponentFixture<NtccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NtccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NtccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
