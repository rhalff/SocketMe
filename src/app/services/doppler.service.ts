import { Logger } from 'angular2-logger/core';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service';
import {ISocketMeService} from './ISocketMeService';

export type DopplerStatus = {

}

export class DopplerService implements ISocketMeService {
  public name: string = 'Doppler';
  public title: string = 'Doppler';
  public isActive: boolean = false;
  public status: DopplerStatus =  new DopplerStatus();

  private _cache: Cache;
  private _log;
  private _doppler = window.doppler;

  constructor(
    log: Logger,
    cache: CacheService
  )  {
    this._log = log;
    this._cache = cache.create('doppler');

    this._success = this._success.bind(this);
  }

  start () {
    if (!this.isActive) {
      this.isActive = true;
      this._doppler.init(this._success);
    }
  }

  stop() {
    if (this.isActive) {
      this.isActive = false;
      this._cache.clear();
      this._doppler.stop();
    }
  }

  private _success (result) {
    this.status = result;
    this._cache.add(this.status);
  }
}
