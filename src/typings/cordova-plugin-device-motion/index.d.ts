/// <reference path="../../../node_modules/cordova-plugin-device-motion/types/index.d.ts"/>

interface Accelerometer {
  watchAcceleration(
    accelerometerSuccess: (acceleration: Acceleration) => void,
    accelerometerError: (error: Error) => void,
    accelerometerOptions?: AccelerometerOptions): WatchHandle;
}
