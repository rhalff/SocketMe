import { SocketPayloads } from '../actions/sockets';
import { SOCKETS } from '../constants/sockets';

export function sockets (
  state: any = [],
  {type, payload}
) : SocketPayloads {
  switch (type) {
    // makes no sense this.
    case SOCKETS.SEND:
      return {
        type,
        send: payload
      };
    case SOCKETS.STATUS:
      return {
        type,
        status: payload
      };
    default:
      return state;
  }
}
