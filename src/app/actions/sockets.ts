import { Action } from '@ngrx/store';
import { SOCKETS } from '../constants/sockets';
import { SocketMeService } from '../services';

export interface SocketStatusPayload {
  status: 'connected' | 'disconnected' | 'reconnect' | 'reconnecting' |
          'error' | 'reconnect_error' | 'reconnect_failed',
  url: string
}

export class SocketSend implements Action {
  readonly type = SOCKETS.SEND;

  constructor(public payload: {[key: string]: any}) {}
}

export class SocketStatus implements Action {
  readonly type = SOCKETS.STATUS;

  constructor(public payload: SocketStatusPayload) {}
}

export type SocketActions = SocketSend | SocketStatus;
