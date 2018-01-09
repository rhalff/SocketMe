import { SERVICES } from '../constants/services';

export function services (
  state: Array<string> = [],
  {type, payload}
) : Array<string> {
  switch (type) {
    case SERVICES.TOGGLE:
      if (payload.activate) {
        return [
          ...state,
          payload.name
        ];
      }

      return state.filter((serviceName) => serviceName !== payload.name);
    default:
      return state;
  }
}
