import { Injectable } from '@angular/core';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service';
import {ISocketMeService} from './ISocketMeService';

export interface OrientationStatus {
  absolute: boolean;
  alpha: number;
  beta: number;
  gamma: number;
};

@Injectable()
export class OrientationService implements ISocketMeService {
  public name: string = 'Orientation';
  public title: string = 'Orientation';
  public isActive: boolean = false;
  public status: OrientationStatus;

  private _cache: Cache;

  constructor(
    cache: CacheService
  )  {
    this._cache = cache.create('orientation');

    this._deviceOrientationListener = this._deviceOrientationListener.bind(this);
  }

  start() {
    if (!this.isActive) {
      this.isActive = true;
      window.addEventListener(
        'deviceorientation',
        this._deviceOrientationListener
      );
    }
  }

  stop() {
    if (this.isActive) {
      this.isActive = false;
      window.removeEventListener(
        'deviceorientation',
        this._deviceOrientationListener
      );
      this._cache.clear();
    }
  }

  private _deviceOrientationListener (event) {
    this.status = {
      absolute: event.absolute,
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma
    };

    this._cache.add(this.status)
  }
}
