import { ISocketMeService} from './ISocketMeService';
import { Cache } from './lib/Cache';
import { CacheService } from './cache.service'

export type BatteryStatus = {
  timeStamp: number;
  level: number;
  isPlugged: boolean;
  charging: boolean;
  dischargingTime: number;
}

export class BatteryService implements ISocketMeService {
  public name: string = 'Battery';
  public title: string = 'Battery';
  public isActive: boolean = false;
  public status: BatteryStatus;

  private _isPlugged: boolean = false;
  private _dischargingTime: number = 0;
  private _charging: boolean = false;
  private _cache: Cache = null;
  private _battery = null;

  constructor(cacheService: CacheService) {
    this._cache = cacheService.create('battery');
    this._onStatus = this._onStatus.bind(this);

    if (navigator.getBattery) {
      this._battery = navigator.getBattery();
    }
  }

  private _onStatus() {
    this.status = {
      timeStamp: this._battery.timeStamp || Date.now(),
      level: this._battery.level,
      isPlugged: this._battery.hasOwnProperty('isPlugged') ? this._battery.isPlugged : this._isPlugged,
      charging: this._battery.hasOwnProperty('charging') ? this._battery.charging : this._charging,
      dischargingTime: this._battery.dischargingTime || this._dischargingTime
    };

    // this makes no sense ofcourse..
    this._isPlugged = this.status.isPlugged;
    this._dischargingTime = this.status.dischargingTime;
    this._charging = this.status.charging;
    this._cache.add(this.status);
  }

  private _removeListeners() {
    this._battery.removeEventListener('chargingchange', this._onStatus);
    this._battery.removeEventListener('levelchange', this._onStatus);
    this._battery.removeEventListener('dischargingtimechange', this._onStatus);
  }

  public start() {
    if (!this.isActive) {
      this.isActive = true;
      if (this._battery) {
        this._battery.then(() => {
          this._onStatus();
          this._removeListeners();
          this._battery.addEventListener('chargingchange', this._onStatus);
          this._battery.addEventListener('levelchange', this._onStatus);
          this._battery.addEventListener('dischargingtimechange', this._onStatus);
        })
      }
      window.removeEventListener('batterystatus', this._onStatus);
      window.addEventListener('batterystatus', this._onStatus, false);
    }
  }

  public stop() {
    if (this.isActive) {
      this.isActive = false;
      this._cache.clear();
      window.removeEventListener('batterystatus', this._onStatus);
      if (this._battery) {
        this._removeListeners();
      }
    }
  }
}

