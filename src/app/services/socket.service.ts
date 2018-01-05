import io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Config } from './config.service';
import { CacheService } from './cache.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.store';

import {
  SocketSend,
  SocketStatus
} from '../actions/sockets';

import ConnectOpts = SocketIOClient.ConnectOpts;

const url = 'fixme';

@Injectable()
export class SocketService {
  private _intervalID;
  private _sockets = {};
  public url;

  constructor(
    private _log: Logger,
    private _config: Config,
    private _cacheService: CacheService,
    private _store: Store<AppStore>
  ) {

    this._onConnect = this._onConnect.bind(this);
    this._onDisconnect = this._onDisconnect.bind(this);
    this._onError = this._onError.bind(this);
    this._onReconnect = this._onReconnect.bind(this);
    this._onReconnecting = this._onReconnecting.bind(this);
    this._onReconnectError = this._onReconnectError.bind(this);
    this._onReconnectFailed = this._onReconnectFailed.bind(this);
    this._pollData = this._pollData.bind(this);
  }

  connect(url: string, options: ConnectOpts) {
    let socket;

    socket = this._sockets[url];

    if (socket) {
      socket.disconnect();
    }

    this._log.info('Connecting to %s', url);

    socket = this._sockets[url] = io(url, options);

    socket.on('connect', this._onConnect);
    socket.on('disconnect', this._onDisconnect);
    socket.on('reconnect', this._onReconnect);
    socket.on('reconnecting', this._onReconnecting);
    socket.on('reconnect_error', this._onReconnectError);
    socket.on('reconnect_failed', this._onReconnectFailed);
    socket.on('error', this._onError);

    this.startPolling(this._config.socket.frequency);

    this.url = url;
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
      socket.off('connect');
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

        sockets.forEach((url) => {
          this._sockets[url].emit('input', payload);
        });

        this._store.dispatch(new SocketSend(payload));

        this._cacheService.flush();
      } else {
        this._log.debug('SocketMe: Cache not dirty skipping');
      }
    }
  }

  private _onConnect(s, a) {
    console.log(s, a)
    this._store.dispatch(
      new SocketStatus({ status: 'connected', url: url })
    );
    this._log.info('Connected to %s', url);
  }

  private _onDisconnect() {
    this._store.dispatch(
      new SocketStatus({ status: 'disconnected', url: url })
    );
    this._log.info('Disconnected from %s', url);
  }

  private _onReconnect() {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnect', url: url })
    );
    this._log.info('Reconnected to %s', url);
  }

  private _onReconnecting(/* attemptNo */) {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnecting', url: url })
    );
    this._log.info('Reconnecting to %s', url);
  }

  private _onError(error) {
    this._store.dispatch(
      new SocketStatus({ status: 'error', url })
    );
    this._log.info('Socket error for %s', url, error);
  }

  private _onReconnectError(/* err */) {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnect_error', url: url })
    );
    this._log.info('Reconnect error to %s', url);
  }

  private _onReconnectFailed(/* reconnectionAttempts */) {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnect_failed', url: url })
    );

    this._log.info('Reconnect error to %s', url);
  }
}
