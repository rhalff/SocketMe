import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service';
import {ISocketMeService} from './ISocketMeService';

export type WifiStatus = {
  BSSID: string;
  SSID: string;
  level: number;
};

@Injectable()
export class WifiService implements ISocketMeService {
  public name: string = 'Wifi';
  public title: string = 'Wifi';
  public isActive: boolean = false;
  public status: WifiStatus[];
  public options = {frequency: 1000};

  private _cache: Cache;
  private _log;
  private _watchID;

  private _wifi = navigator.wifi;

  constructor(
    log: Logger,
    cache: CacheService
  )  {
    this._log = log;
    this._cache = cache.create('wifi');


    this._error = this._error.bind(this);
    this._success = this._success.bind(this);
  }

  start () {
    if (!this.isActive) {
      this.isActive = true;
      this._watchID = this._wifi.watchAccessPoints(
        this._success,
        this._error,
        this.options
      );
    }
  }

  stop () {
    if (this.isActive) {
      this.isActive = false;
      this._cache.clear();
      if (this._watchID) {
        this._wifi.clearWatch(this._watchID);
      }
    }
  }

  private _error (error: Error) {
    this._log.error(error)
  }

  // BSSID: Address of the access point
  // SSID: Network name
  // level: RSSI
  private _success (result: AccessPoint[]) {
    this.status = result.map((network) => ({
      BSSID: network.BSSID,
      SSID: network.SSID,
      level: network.level
    }));

    this._cache.add(this.status)
  }
}
