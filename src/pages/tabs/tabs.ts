import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  cacheRoot = 'CachePage'
  dashboardRoot = 'DashboardPage'
  settingsRoot = 'SettingsPage'

  constructor(public navCtrl: NavController) {}

}
