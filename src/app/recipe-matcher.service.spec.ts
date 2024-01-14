import { TestBed } from '@angular/core/testing';

import { RecipeMatcherService } from './recipe-matcher.service';

describe('RecipeMatcherService', () => {
  let service: RecipeMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeMatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
