import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { SERVICES } from '../constants/services';
import { SocketMeServices } from '../services/SocketMe.services';
import { ServiceStatus, ServiceToggle } from '../actions/services';

@Injectable()
export class SocketMeServicesEffect {
  @Effect()
  login$: Observable<Action> = this.actions$.ofType(SERVICES.TOGGLE)
    .mergeMap((action: ServiceToggle) => {
      const {activate, name} = action.payload
      if (activate) {
        this.services.start(name.toLowerCase())
      } else {
        this.services.stop(name.toLowerCase())
      }

      return of(new ServiceStatus({ name, activated: activate }))
    })

  constructor(
    private services: SocketMeServices,
    private actions$: Actions
  ) {}
}
