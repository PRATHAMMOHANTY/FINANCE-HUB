import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { PlanapplicationformService } from './planapplicationform.service';

describe('PlanapplicationformService', () => {
  let service: PlanapplicationformService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule to the imports if HttpClient is used
    });
    service = TestBed.inject(PlanapplicationformService);
  });

  fit('Frontend_should_create_PlanapplicationformService_service', () => {
    expect(service).toBeTruthy();
  });
});
