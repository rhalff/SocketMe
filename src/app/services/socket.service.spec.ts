import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { Logger } from 'angular2-logger/core';
import { AppStore } from '../app.store';
import { Store } from '@ngrx/store';

describe('SocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService, Logger, ]
    });
  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
