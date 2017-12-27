import { BatteryStatus } from '../services/battery.service'
import { CompassStatus } from '../services/compass.service'
import { LocationStatus } from '../services/location.service'
import { MotionStatus } from '../services/motion.service'
import { OrientationStatus } from '../services/orientation.service'
import { SignalStatus } from '../services/signal.service'
import { WifiStatus } from '../services/wifi.service'

export interface Sensors {
  battery: BatteryStatus,
  compass: CompassStatus,
  location: LocationStatus,
  motion: MotionStatus,
  orientation: OrientationStatus,
  signal: SignalStatus,
  wifi: WifiStatus
}
