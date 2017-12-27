interface Navigator {
  wifi: Wifi;
}

interface AccessPoint {
  BSSID: string,
  SSID: string,
  level: number,
  capabilities: string
}

interface Wifi {
  getAccessPoints(successCallback, errorCallback): void,
  watchAccessPoints(
    wifiSuccess: (networks: AccessPoint[]) => void,
    wifiError: (error: Error) => void,
    wifiOptions?: WifiOptions): WatchHandle;
  clearWatch(watchID: WatchHandle): void;
}

interface WifiOptions {
  frequency?: number;
}

interface WatchHandle { }
