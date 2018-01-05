import { SocketActions} from '../actions/sockets';
import { SOCKETS } from '../constants/sockets';

export function sockets (
  state: any = [],
  {type, payload}
) : SocketActions {
  switch (type) {
    case SOCKETS.SEND:
      return {
        ...state,
        send: payload
      };
    case SOCKETS.STATUS:
      return {
        ...state,
        status: payload
      };
    default:
      return state;
  }
}
