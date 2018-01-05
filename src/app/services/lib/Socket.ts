import io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Config } from '../config.service';
// import { CacheService } from '../cache.service';
// import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.store';

import {
  // SocketSend,
  SocketStatus
} from '../../actions/sockets';

import ConnectOpts = SocketIOClient.ConnectOpts;

@Injectable()
export class Socket {
  private socket;
  public url;

  constructor(
    private _log: Logger,
    private _config: Config,
    private _store: Store<AppStore>
  ) {

    this._onConnect = this._onConnect.bind(this);
    this._onDisconnect = this._onDisconnect.bind(this);
    this._onError = this._onError.bind(this);
    this._onReconnect = this._onReconnect.bind(this);
    this._onReconnecting = this._onReconnecting.bind(this);
    this._onReconnectError = this._onReconnectError.bind(this);
    this._onReconnectFailed = this._onReconnectFailed.bind(this);
  }

  connect(url: string, options: ConnectOpts) {
    this._log.info('Connecting to %s', this.url);

    this.socket = io(url, options);
    this.socket.on('connect', this._onConnect);
    this.socket.on('disconnect', this._onDisconnect);
    this.socket.on('reconnect', this._onReconnect);
    this.socket.on('reconnecting', this._onReconnecting);
    this.socket.on('reconnect_error', this._onReconnectError);
    this.socket.on('reconnect_failed', this._onReconnectFailed);
    this.socket.on('error', this._onError);

    this.url = url;
  }

  disconnect () {
    if (this.socket) {
      this.socket.off('connect');
      this.socket.disconnect();
      this._log.info('Disconnected from %s', this.url);
    }
  }

  send(payload) {
    this.socket.emit('input', payload);
  }

  private _onConnect() {
    this._store.dispatch(
      new SocketStatus({ status: 'connected', url: this.url })
    );
    this._log.info('Connected to %s', this.url);
  }

  private _onDisconnect() {
    this._store.dispatch(
      new SocketStatus({ status: 'disconnected', url: this.url })
    );
    this._log.info('Disconnected from %s', this.url);
  }

  private _onReconnect() {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnect', url: this.url })
    );
    this._log.info('Reconnected to %s', this.url);
  }

  private _onReconnecting(/* attemptNo */) {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnecting', url: this.url })
    );
    this._log.info('Reconnecting to %s', this.url);
  }

  private _onError(error) {
    this._store.dispatch(
      new SocketStatus({ status: 'error', url: this.url })
    );
    this._log.info('Socket error for %s', this.url, error);
  }

  private _onReconnectError(/* err */) {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnect_error', url: this.url })
    );
    this._log.info('Reconnect error to %s', this.url);
  }

  private _onReconnectFailed(/* reconnectionAttempts */) {
    this._store.dispatch(
      new SocketStatus({ status: 'reconnect_failed', url: this.url })
    );

    this._log.info('Reconnect error to %s', this.url);
  }
}
