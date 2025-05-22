import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { SavingsplanService } from './savingsplan.service';

describe('SavingsplanService', () => {
  let service: SavingsplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule to the imports
    });
    service = TestBed.inject(SavingsplanService);
  });

  fit('Frontend_should_create_Savingsplan_service', () => {
    expect(service).toBeTruthy();
  });
});
