import { Injectable } from '@angular/core';

import {
  BatteryService,
  ISocketMeService,
  CompassService,
  MotionService,
  OrientationService,
  SignalService,
  WifiService,
  LocationService,
} from './index'

type ServiceTypes = {
  [key: string]: ISocketMeService
};

@Injectable()
export class SocketMeServices {
  private _services: ServiceTypes = {};

  constructor(
    battery: BatteryService,
    compass: CompassService,
    motion: MotionService,
    orientation: OrientationService,
    signal: SignalService,
    wifi: WifiService,
    location: LocationService,
  ) {
    this._services.battery = battery;
    this._services.compass = compass;
    this._services.motion = motion;
    this._services.orientation = orientation;
    this._services.signal = signal;
    this._services.wifi = wifi;
    this._services.location = location;
  }

  start(name: string) {
    this._services[name].start();
  }

  stop(name: string) {
    this._services[name].stop();
  }
}
