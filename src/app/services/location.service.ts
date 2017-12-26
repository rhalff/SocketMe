import { Logger } from 'angular2-logger/core';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service';
import {ISocketMeService} from './ISocketMeService';

export type LocationStatus = {
  latitude: number;
  longitude: number;
}

export class LocationService implements ISocketMeService {
  public name: string = 'Location';
  public title: string = 'Location';
  public isActive: boolean = false;
  public status: LocationStatus;

  private _cache: Cache;
  private _watchID = null;
  private _log;
  private _geolocation = navigator.geolocation;

  constructor(log: Logger, cache: CacheService)  {
    this._log = log;
    this._cache = cache.create('location');

    this._error = this._error.bind(this);
    this._success = this._success.bind(this);
  }

  start() {
    if (!this.isActive) {
      /*
      const options = {
        timeout: 3000,
        maximumAge: 3000,
        enableHighAccuracy: true // may cause errors if true
      }
      */
      this.isActive = true;
      this._watchID = this._geolocation.watchPosition(this._success, this._error /*, options */);
    }
  }

  stop() {
    if (this.isActive) {
      this.isActive = false;
      if (this._watchID) {
        this._geolocation.clearWatch(this._watchID);
      }
      this._cache.clear();
    }
  }

  private _error (err) {
    this._log.error(err);
  }

  private _success (position) {
    this.status = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    this._cache.add(this.status);
  }
}
