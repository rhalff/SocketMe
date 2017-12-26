import { async, TestBed } from '@angular/core/testing';

import { Cache } from './Cache';
import { Logger } from 'angular2-logger/core';

describe('Cache', () => {
  let cache;
  const log = new Logger();

  beforeEach(() => {
    cache = new Cache(log)
  });

  it('should not be dirty', () => {
    expect(cache.isDirty()).toBe(false)
  });

  it('peek() returns empty', () => {
    expect(cache.peek().length).toBe(0);
  });

  it('can add to cache', () => {
    cache.add('mystring');
    cache.add(true);
    cache.add(null);

    expect(cache.peek().length).toBe(3)
  });

  // TODO: not sure what the behavior of get should be?
  it('can get cache', () => {
    cache.add('mystring');
    cache.add(true);
    cache.add(null);

    expect(cache.get().length).toBe(3)
  });

  it('flushes cache', () => {
    cache.add(1);
    cache.add(2);
    cache.add(3);

    expect(cache.isDirty()).toBe(true);
    expect(cache.peek().length).toBe(3);

    cache.flush();

    expect(cache.isDirty()).toBe(false);
    expect(cache.peek().length).toBe(0)
  });

  it('does not grow beyond maxLength', () => {
    cache.maxLength = 2;
    cache.add('mystring');
    cache.add(true);
    cache.add(2);

    const inCache = cache.peek();

    expect(inCache.length).toBe(2)
    expect(inCache[0]).toBe(true)
    expect(inCache[1]).toBe(2)
  });
});
