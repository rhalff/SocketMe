import { Injectable } from '@angular/core';
import { Logger, Level } from 'angular2-logger/core';
import { Config } from './config.service';
import { CacheService } from './cache.service';
import { Socket } from './lib/Socket';
// import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import {
  SocketSend
//  SocketStatus
} from '../actions/sockets';

import ConnectOpts = SocketIOClient.ConnectOpts;

@Injectable()
export class SocketService {
  private _intervalID;
  private _sockets = {};

  constructor(
    private _log: Logger,
    private _config: Config,
    private _cacheService: CacheService,
    private _store: Store<AppStore>
  ) {
    this._log.level = Level.DEBUG
    this._pollData = this._pollData.bind(this);
  }

  connect(url: string, options: ConnectOpts) {
    let socket;

    socket = this._sockets[url];

    if (socket) {
      socket.disconnect();
    }

    this._log.info('Connecting to %s', url);

    socket = new Socket(this._log, this._store);
    socket.connect(url, options);

    this._sockets[url] = socket;

    this.startPolling(this._config.socket.frequency);
  }

  startPolling(frequency: number) {
    if (this._intervalID) {
      clearInterval(this._intervalID)
    }

    this._intervalID = setInterval(
      this._pollData,
      frequency
    );
  }

  disconnect (url: string) {
    const socket = this._sockets[url];

    if (socket) {
      socket.disconnect();
      delete this._sockets[url];
      this._log.info('Disconnected from %s', url);
    }

    console.log(Object.keys(this._sockets).length);

    if (!Object.keys(this._sockets).length) {
      clearInterval(this._intervalID);
      this._log.info('Stop polling');
      this._intervalID = null;
    }
  }

  private _pollData() {
    const sockets = Object.keys(this._sockets);

    if (sockets.length) {
      const payload = this._cacheService.peek();

      if (this._cacheService.isDirty()) {
        this._log.debug('SocketMe: Cache is Dirty, sending/broadcast');
        this._log.debug('SocketMe: payload', JSON.stringify(payload));

        // hier wordt het al verzonden..
        sockets.forEach((url) => {
          this._sockets[url].send(payload);
        });

        this._store.dispatch(new SocketSend(payload));

        this._cacheService.flush();
      } else {
        this._log.debug('SocketMe: Cache not dirty skipping');
      }
    } else {
      this._log.debug('SocketMe: _pollData no sockets to send to');
    }
  }
}
