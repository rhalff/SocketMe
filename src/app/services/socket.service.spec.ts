// @see: https://github.com/ngrx/platform/blob/master/docs/store/testing.md
import { TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { SocketService } from './socket.service';
import { Logger } from 'angular2-logger/core';
import { Config } from './config.service';
import { CacheService } from './cache.service';
import { sockets } from '../reducers/sockets.reducer'
import {
  socketSend,
  socketStatus
} from '../actions/sockets';

import { AppStore } from '../app.store';

describe('SocketService', () => {
  let store: Store<AppStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          sockets
        })
      ],
      providers: [SocketService, Logger, Config, CacheService]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();

    /* Only testing the service here.
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    */
  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));

  it('dispatches action', () => {
    const action = socketSend({ whatever: ''});

    expect(store.dispatch).toHaveBeenCalledWith(action);

  });
});
