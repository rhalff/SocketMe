import { async, TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { Logger } from 'angular2-logger/core';
import { CacheService } from './cache.service';
import { Cache } from './lib/Cache';

describe('Location Service', () => {
   let locationService;

   beforeEach(() => {
     const log = new Logger();
     const cacheService = new CacheService(log);

     locationService = new LocationService(log, cacheService);
   });

   it('name is Location', () => {
     expect(locationService.name).toBe('Location');
   });

  it('title is Location', () => {
    expect(locationService.name).toBe('Location');
  });

  it('can start', () => {
    locationService.start();
    expect(locationService.isActive).toBe(true);
  });

  /*
  it('records location', async () => {
    locationService.start();

    expect(result).toBe('')
  });
  */

  it('can stop', () => {
    locationService.start();
    expect(locationService.isActive).toBe(true);
    locationService.stop();
    expect(locationService.isActive).toBe(false);
  });
});
