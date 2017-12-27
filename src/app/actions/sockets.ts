import { SOCKETS } from '../constants/sockets';

export function socketSend(payload) {
  return {
    type: SOCKETS.SEND,
    payload
  }
}

export function socketStatus(payload) {
  return {
    type: SOCKETS.STATUS,
    payload
  }
}
