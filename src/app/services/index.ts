import { BatteryService } from './battery.service';
import { CacheService } from './cache.service';
import { CompassService } from './compass.service';
import { MotionService } from './motion.service';
import { OrientationService} from './orientation.service';
import { SignalService} from './signal.service';
import { LocationService} from './location.service';
import { SettingsService } from './settings.service';
import { WifiService} from './wifi.service';
import { ISocketMeService } from './ISocketMeService';

export {
  BatteryService,
  ISocketMeService,
  CacheService,
  CompassService,
  MotionService,
  OrientationService,
  SignalService,
  WifiService,
  LocationService,
  SettingsService
}

export type SocketMeService =
  BatteryService |
  ISocketMeService |
  CacheService |
  CompassService |
  MotionService |
  OrientationService |
  SignalService |
  WifiService |
  LocationService |
  SettingsService

