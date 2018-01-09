import { Injectable } from '@angular/core';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service';
import {ISocketMeService} from './ISocketMeService';

const dbm = window.SignalStrength ? window.SignalStrength.dbm : null;

export interface SignalStatus {
  dBm: number;
};

@Injectable()
export class SignalService implements ISocketMeService {
  public name: string = 'Signal';
  public title: string = 'Signal';
  public isActive: boolean = false;
  public status: SignalStatus;
  public frequency = 2000;

  private _cache: Cache;
  private _stopInterval;

  constructor(
    cache: CacheService
  )  {
    this._cache = cache.create('signal');
  }

  start () {
    if (!this.isActive) {
      this.isActive = true;
      if (!this._stopInterval) {
        this._stopInterval = setInterval(
          this._watchSignal,
          this.frequency
        );
      }
    }
  }

  stop () {
    if (this.isActive) {
      this.isActive = false;
      if (this._stopInterval) {
        clearInterval(this._stopInterval);
        this._stopInterval = null;
      }
      this._cache.clear();
    }
  }

  private _getStrength (dBm: number) {
    this.status = {
      dBm
    };
    this._cache.add(this.status);
  }

  private _watchSignal () {
    if (dbm) dbm(this._getStrength);
  }
}
