interface Action {
  type: string;
  payload?: any;
}

interface Compass {
  clearWatch: (watchID: number) => void,
  watchHeading: (
    successHandler: (result: any) => void,
    errorHandler: (error: Error) => void,
    options?: object
  ) => void,
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
  compass: Compass;
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

