import { Logger } from 'angular2-logger/core';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service';
import {ISocketMeService} from './ISocketMeService';

export type CompassStatus = {
  magneticHeading: number;
  trueHeading: number;
  accuracy: number;
  timeStamp: number;
}

export class CompassService implements ISocketMeService {
  public name: string = 'Compass';
  public title: string = 'Compass';
  public isActive: boolean = false;
  public status: CompassStatus;

  private _cache: Cache;
  private _watchID = null;
  private _log: Logger;
  private compass = navigator.compass;

  constructor(log: Logger, cache: CacheService) {
    this._log = log;
    this._cache = cache.create('compass');

    this._success = this._success.bind(this);
    this._error = this._error.bind(this);

  }

  start() {
    if (!this.isActive) {
      // if frequency is set, filter is ignored
      /*
      const options = {
        filter: 5 // change in degrees
        // frequency: 1000
      }
      */
      this.isActive = true;
      this._watchID = this.compass.watchHeading(this._success, this._error /* , options */);
    }
  }

  stop() {
    if (this.isActive) {
      this.isActive = false;
      if (this._watchID) {
        this.compass.clearWatch(this._watchID);
      }
      this._cache.clear();
    }
  }

  // updates constantly (depending on frequency value)
  private _success (result) {
    this.status = {
      magneticHeading: result.magneticHeading,
      trueHeading: result.trueHeading,
      accuracy: result.headingAccuracy,
      timeStamp: result.timestamp
    };

    this._cache.add(this.status)
  }

  private _error (err) {
    this._log.error(err)
  }
}
