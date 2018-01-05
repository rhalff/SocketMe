import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';
import {
  BatteryService,
  CacheService,
  CompassService,
  MotionService,
  OrientationService,
  SignalService,
  WifiService,
  LocationService
} from '../../app/services'

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild()
  ],
  exports: [
    SettingsPage
  ],
  providers: [
    CacheService,
    BatteryService,
    CompassService,
    MotionService,
    OrientationService,
    SignalService,
    WifiService,
    LocationService
  ]
})
export class SettingsPageModule { }
