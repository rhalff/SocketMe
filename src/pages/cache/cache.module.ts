import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CachePage } from './cache';

@NgModule({
  declarations: [
    CachePage,
  ],
  imports: [
    IonicPageModule.forChild(CachePage),
  ],
})
export class CachePageModule {}
