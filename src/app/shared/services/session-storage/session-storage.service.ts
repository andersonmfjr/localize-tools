import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Change } from '../../models/storage.model';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  sessionStorage: Storage = window.sessionStorage;

  changes: Observable<Change>;
  private changes$ = new Subject<Change>();

  constructor() {
    this.changes = this.changes$.asObservable();
  }

  get isSessionStorageSupported(): boolean {
    return !!this.sessionStorage;
  }

  get(key: string): any {
    if (this.isSessionStorageSupported) {
      const item = this.sessionStorage.getItem(key);

      if (item && item !== 'undefined') {
        return JSON.parse(item);
      }

      return null;
    }

    return null;
  }

  set(key: string, value: any): boolean {
    if (this.isSessionStorageSupported) {
      this.sessionStorage.setItem(key, JSON.stringify(value));

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
    if (this.isSessionStorageSupported) {
      this.sessionStorage.removeItem(key);

      this.changes$.next({
        type: 'remove',
        key,
      });

      return true;
    }

    return false;
  }

  clear(): boolean {
    if (this.isSessionStorageSupported) {
      this.sessionStorage.clear();
      return true;
    }

    return false;
  }
}
