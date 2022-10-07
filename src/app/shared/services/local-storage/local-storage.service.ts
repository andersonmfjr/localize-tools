import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Change } from '../../models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  localStorage: Storage = window.localStorage;

  changes: Observable<Change>;
  private changes$ = new Subject<Change>();

  constructor() {
    this.changes = this.changes$.asObservable();
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

  get(key: string): any {
    if (this.isLocalStorageSupported) {
      const item = this.localStorage.getItem(key);

      if (item && item !== 'undefined') {
        return JSON.parse(item);
      }

      return null;
    }

    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));

      this.changes$.next({
        type: 'set',
        key,
        value,
      });

      return true;
    }

    return false;
  }

  remove(key: string): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);

      this.changes$.next({
        type: 'remove',
        key,
      });

      return true;
    }

    return false;
  }

  clear(): boolean {
    this.localStorage.clear();
    return true;
  }
}
