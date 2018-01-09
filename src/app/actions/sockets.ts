import { Action } from '@ngrx/store';
import { SOCKETS } from '../constants/sockets';

export interface SocketStatusPayload {
  status: 'connected' | 'disconnected' | 'reconnect' | 'reconnecting' |
          'error' | 'reconnect_error' | 'reconnect_failed',
  url: string
}

export type SocketSendPayload = {[key: string]: any};
export type SocketDataPayload = { data: any, url: string };

export class SocketSend implements Action {
  readonly type = SOCKETS.SEND;

  constructor(public payload: SocketSendPayload) {}
}

export class SocketStatus implements Action {
  readonly type = SOCKETS.STATUS;

  constructor(public payload: SocketStatusPayload) {}
}

export class SocketData implements Action {
  readonly type = SOCKETS.DATA;

  constructor(public payload: SocketDataPayload) {}
}

export type SocketActions = SocketSend | SocketStatus | SocketData;
export type SocketPayloads = SocketSendPayload | SocketStatusPayload | SocketDataPayload;
