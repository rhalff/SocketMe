import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CachePage } from './cache';
import { CacheService } from "../../app/services";

@NgModule({
  declarations: [
    CachePage,
  ],
  imports: [
    IonicPageModule.forChild(CachePage),
  ],
  providers: [
    CacheService
  ]
})
export class CachePageModule {}
