import { Injectable } from '@angular/core';
import {Cache} from './lib/Cache'
import {Logger} from 'angular2-logger/core'

@Injectable()
export class CacheService {
  private _dirty: boolean = false;
  private _caches = {};

  constructor(private _log: Logger) { }

  create(name) {
    this._log.debug('CACHE:create(%s)', name);
    this._caches[name] = new Cache(this._log);
    return this._caches[name];
  }

  peek() {
    this._log.debug('CACHE:peek');

    return Object.keys(this._caches).reduce((obj, key) => {
      if (this._caches[key].isDirty()) {
        obj[key] = this._caches[key].peek();
        this._dirty = true;
      }
      return obj;
    }, {
      ts: Date.now()
    })
  }

  isDirty() {
    this._log.debug('CACHE:isDirty');

    if (this._dirty) {
      return true;
    }

    const keys = Object.keys(this._caches);

    for (let i = 0; i < keys.length; i++) {
      if (this._caches[keys[i]].isDirty()) {
        this._dirty = true;
        break;
      }
    }

    return this._dirty;
  }

  get() {
    this._log.debug('CACHE:get');
    return Object.keys(this._caches).reduce((obj, key) => {
      if (this._caches[key].isDirty()) {
        obj[key] = this._caches[key].get();
        this._dirty = true;
      }
      return obj;
    }, {})
  }

  flush() {
    this._log.debug('CACHE:flush');
    Object.keys(this._caches).forEach((key) => {
      this._caches[key].flush();
    });
    this._dirty = false;
  }

  clear() {
    this._log.debug('CACHE:clear');
    Object.keys(this._caches).forEach((key) => {
      this._caches[key].clear();
    });
    this._dirty = false;
  }
}
