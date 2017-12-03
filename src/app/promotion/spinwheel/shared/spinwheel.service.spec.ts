import { TestBed, inject } from '@angular/core/testing';

import { SpinwheelService } from './spinwheel.service';

describe('SpinwheelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinwheelService]
    });
  });

  it('should be created', inject([SpinwheelService], (service: SpinwheelService) => {
    expect(service).toBeTruthy();
  }));
});
