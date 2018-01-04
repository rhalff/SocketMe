import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service';
import {ISocketMeService} from './ISocketMeService';

const accelerometer = navigator.accelerometer;

export type MotionStatus = {
  x: number;
  y: number;
  z: number;
  timeStamp: number;
};

@Injectable()
export class MotionService implements ISocketMeService {
  public name: string = 'Motion';
  public title: string = 'Motion';
  public isActive: boolean = false;
  public status : MotionStatus;

  private _cache: Cache;
  private _watchID = null;
  private _log;

  constructor(
    log: Logger,
    cache: CacheService
  )  {
    this._log = log;
    this._cache = cache.create('motion');

    this._error = this._error.bind(this);
    this._success = this._success.bind(this);
  }

  start() {
    if (!this.isActive) {
      this.isActive = true;
      const options = {frequency: 1000};
      this._watchID = accelerometer.watchAcceleration(
        this._success,
        this._error,
        options
      );
    }
  }

  stop() {
    if (this.isActive) {
      this.isActive = false;
      this._cache.clear();
      if (this._watchID) {
        accelerometer.clearWatch(this._watchID);
      }
    }
  }

  private _error (error) {
    this._log.error(error)
  }

  private _success (acceleration) {
    this.status = {
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z,
      timeStamp: acceleration.timestamp
    };

    this._cache.add(this.status)
  }
}
