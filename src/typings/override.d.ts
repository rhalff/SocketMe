interface Action {
  type: string;
  payload?: any;
}

// fix: @types/cordova-plugin-device-motion
interface Accelerometer {
  watchAcceleration(
    accelerometerSuccess: (acceleration: Acceleration) => void,
    accelerometerError: (error: Error) => void,
    accelerometerOptions?: AccelerometerOptions): WatchHandle;
}

// NavigatorBatteryStatus *wontfix*
// @see: https://github.com/Microsoft/TSJS-lib-generator/pull/236
interface Navigator extends
  Object,
  NavigatorID,
  NavigatorOnLine,
  NavigatorContentUtils,
  NavigatorStorageUtils,
  NavigatorGeolocation,
  MSNavigatorDoNotTrack,
  MSFileSaver,
  NavigatorBeacon,
  NavigatorConcurrentHardware,
  NavigatorUserMedia,
  NavigatorBatteryStatus {
}

interface NavigatorBatteryStatus {
    getBattery(): Promise<BatteryManager>;
}

interface BatteryManager extends BatteryManagerEventTarget {
    readonly charging: boolean;
    readonly chargingTime: number;
    readonly dischargingTime: number;
    readonly level: number;
}

interface BatteryManagerEventTargetEventMap {
    chargingchange: Event;
    chargingtimechange: Event;
    dischargingtimechange: Event;
    levelchange: Event;
}

interface BatteryManagerEventTarget extends EventTarget {
    onchargingchange: (this: BatteryManager, ev: Event) => any;
    onlevelchange: (this: BatteryManager, ev: Event) => any;
    onchargingtimechange: (this: BatteryManager, ev: Event) => any;
    ondischargingtimechange: (this: BatteryManager, ev: Event) => any;
    addEventListener<K extends keyof BatteryManagerEventTargetEventMap>(type: K, listener: (this: BatteryManager, ev: BatteryManagerEventTargetEventMap[K]) => any, useCapture?: boolean): void;
}

