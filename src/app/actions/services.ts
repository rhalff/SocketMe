import { Action } from '@ngrx/store';
import { SERVICES } from '../constants/services';

export interface ToggleServicePayload {
  name: string,
  activate: boolean
}

export interface ServiceStatusType {
  name: string,
  activated: boolean
}

export class ServiceToggle implements Action {
  readonly type = SERVICES.TOGGLE;

  constructor(public payload: ToggleServicePayload) { }
}

export class ServiceStatus implements Action {
  readonly type = SERVICES.STATUS;

  constructor(public payload: ServiceStatusType) { }
}

export type ServiceActions = ServiceToggle | ServiceStatus;
