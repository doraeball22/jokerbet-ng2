import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinwheelResultComponent } from './spinwheel-result.component';

describe('SpinwheelResultComponent', () => {
  let component: SpinwheelResultComponent;
  let fixture: ComponentFixture<SpinwheelResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinwheelResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinwheelResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
