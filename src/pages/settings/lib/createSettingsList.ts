import { Services } from '../settings'

export function createSettingsList({
  battery,
  compass,
  motion,
  orientation,
  signal,
  wifi,
  location
}: Services) {
  return [
    {
      text: 'Battery',
      className: 'icon ion-battery-charging',
      checked: battery.isActive,
      service: battery
    },
    {
      text: 'Motion',
      className: 'icon ion-android-walk',
      checked: motion.isActive,
      service: motion
    },
    {
      text: 'Orientation',
      className: 'icon ion-android-compass',
      checked: orientation.isActive,
      service: orientation
    },
    {
      text: 'Compass',
      className: 'icon ion-android-compass',
      checked: compass.isActive,
      service: compass
    },
    /*
    {
      text: 'Signal',
      className: 'icon ion-ios-telephone',
      checked: signal.isActive,
      service: signal
    },
    {
      text: 'Wifi',
      className: 'icon ion-android-wifi',
      checked: wifi.isActive,
      service: wifi
    },
    */
    {
      text: 'Location',
      className: 'icon ion-android-globe',
      checked: location.isActive,
      service: location
    },
    /*
    {
      text: 'Doppler',
      className: 'icon ion-android-hand',
      checked: doppler.isActive,
      service: doppler
    }
    */
  ]
}
