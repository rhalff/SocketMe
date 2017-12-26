import { Logger } from 'angular2-logger/core';

export class Cache {
  private _cache: Array<any> = [];
  private _peeked: number = 0;
  private _dirty: boolean = false;
  public maxLength: number = 15;

  constructor(
    private _log: Logger
  ) {}

  peek() {
    this._log.debug('cache:%s:peek', name);
    this._peeked = this._cache.length;
    return this._cache.slice();
  }

  isDirty() {
    if (this._dirty) {
      this._log.debug('cache:%s:isDirty', name);
    }
    return this._dirty;
  }

  get() {
    this._log.debug('cache:%s:get', name);
    return this._cache.slice(); // shouldn't this be splice?
  }

  clear() {
    this._log.debug('cache:%s:clear', name);
    this._cache = [];
    this._dirty = false;
    this._peeked = 0;
  }

  flush() {
    this._log.debug('cache:%s:flush', name);
    this._cache = this._cache.splice(this._peeked);
    this._dirty = false;
    this._peeked = 0;
  }

  add(data: any) {
    try {
      this._log.debug('cache:%s:add', name, JSON.stringify(data));
    } catch (e) {
      // circular.
      this._log.debug('cache:%s:add', name);
    }

    this._cache.push(data);

    if (this._cache.length >= this.maxLength) {
      this._cache = this._cache.splice(this._cache.length - this.maxLength);
    }
    this._dirty = true;
  }
}
