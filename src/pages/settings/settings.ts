import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { createSettingsList } from './lib/createSettingsList';
import { ServiceToggle } from '../../app/actions/services';
import { AppStore } from '../../app/app.store';

import {
  ISocketMeService,
  SettingsService,
  BatteryService,
  CompassService,
  MotionService,
  OrientationService,
  SignalService,
  WifiService,
  LocationService
} from '../../app/services';

export interface Services {
  battery?: BatteryService,
  compass?: CompassService,
  motion?: MotionService,
  orientation?: OrientationService,
  signal?: SignalService,
  wifi?: WifiService,
  location?: LocationService,
}

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;

  subSettings: any = SettingsPage;

  services: Services = {};

  settingsList = [];

  constructor(public navCtrl: NavController,
    public settings: SettingsService,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    battery: BatteryService,
    compass: CompassService,
    motion: MotionService,
    orientation: OrientationService,
    signal: SignalService,
    wifi: WifiService,
    location: LocationService,
    private _store: Store<AppStore>
  ) {
    this.services = {
      battery,
      compass,
      motion,
      orientation,
      signal,
      wifi,
      location
    };
    this.settingsList = createSettingsList(this.services)
  }

  toggleIt(payload) {
    this._store.dispatch(new ServiceToggle(payload));
  }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option4: [this.options.option4]
        };
        break;
    }
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
