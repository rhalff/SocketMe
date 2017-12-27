import { async, TestBed } from '@angular/core/testing';

import { Logger } from 'angular2-logger/core';
import { CacheService } from './cache.service';
import { Cache } from './lib/Cache';

describe('Cache Service', () => {
  let cacheService: CacheService;
  let testCache: Cache;

  beforeEach(() => {
    const log = new Logger();
    cacheService = new CacheService(log);
    testCache = cacheService.create('test');
  });

  it('can get cache', () => {
    expect(Object.keys(cacheService.get()).length).toBe(0);
  });

  it('initial is not dirty', () => {
    expect(cacheService.isDirty()).toBe(false);
  });

  it('add to test cache', () => {
    testCache.add('test1');

    expect(cacheService.isDirty()).toBe(true);
  });

  it('clears cache', () => {
    const testCache2 = cacheService.create('test2');
    testCache.add('test1A');
    testCache.add('test1B');
    testCache2.add('test2A');
    testCache2.add('test2B');

    expect(cacheService.isDirty()).toBe(true);

    cacheService.clear();

    expect(cacheService.isDirty()).toBe(false);
  });
});
