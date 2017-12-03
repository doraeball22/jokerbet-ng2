import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponSpinwheelFormComponent } from './coupon-spinwheel-form.component';

describe('CouponSpinwheelFormComponent', () => {
  let component: CouponSpinwheelFormComponent;
  let fixture: ComponentFixture<CouponSpinwheelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponSpinwheelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponSpinwheelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
