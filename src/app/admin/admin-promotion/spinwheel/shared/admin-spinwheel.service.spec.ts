import { TestBed, inject } from '@angular/core/testing';

import { AdminSpinwheelService } from './admin-spinwheel.service';

describe('AdminSpinwheelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminSpinwheelService]
    });
  });

  it('should be created', inject([AdminSpinwheelService], (service: AdminSpinwheelService) => {
    expect(service).toBeTruthy();
  }));
});
