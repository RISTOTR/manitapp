/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HireService } from './hire.service';

describe('Service: Hire', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HireService]
    });
  });

  it('should ...', inject([HireService], (service: HireService) => {
    expect(service).toBeTruthy();
  }));
});
