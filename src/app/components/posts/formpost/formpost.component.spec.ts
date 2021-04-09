import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpostComponent } from './formpost.component';

describe('FormpostComponent', () => {
  let component: FormpostComponent;
  let fixture: ComponentFixture<FormpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
