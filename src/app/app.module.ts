import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { Config } from './services/config.service';

import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { CachePageModule } from '../pages/cache/cache.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Logger } from "angular2-logger/core";
import { sockets } from './reducers/sockets.reducer';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    DashboardPageModule,
    SettingsPageModule,
    CachePageModule,
    TabsPageModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({
      sockets
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
    /*,
    DashboardPage,
    SettingsPage,
    CachePage,
    */
  ],
  providers: [
    Config,
    Logger,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
