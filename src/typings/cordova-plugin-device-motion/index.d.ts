/// <reference path="../../../node_modules/@types/cordova-plugin-device-motion/index.d.ts"/>

interface Accelerometer {
  watchAcceleration(
    accelerometerSuccess: (acceleration: Acceleration) => void,
    accelerometerError: (error: Error) => void,
    accelerometerOptions?: AccelerometerOptions): WatchHandle;
}
