import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { Config } from './services/config.service';
import { SettingsService } from './services/settings.service';

import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { CachePageModule } from '../pages/cache/cache.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Logger } from "angular2-logger/core";
import { sockets } from './reducers/sockets.reducer';
import { services } from './reducers/services.reducer';

import { provideSettings } from './provideSettings';
import { createTranslateLoader } from './createTranslateLoader';

import { EffectsModule } from '@ngrx/effects';
import { SocketMeServices } from './services/SocketMe.services';
import { SocketMeServicesEffect } from './effects/services.effect';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DashboardPageModule,
    SettingsPageModule,
    CachePageModule,
    TabsPageModule,
    EffectsModule.forRoot([SocketMeServicesEffect]),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({
      services,
      sockets
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
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
    SocketMeServices,
    {provide: SettingsService, useFactory: provideSettings, deps: [Storage]},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
