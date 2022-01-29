import { TestBed } from '@angular/core/testing';

import { TaskWebRequestService } from './task-web-request.service';

describe('TaskWebRequestService', () => {
  let service: TaskWebRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskWebRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
