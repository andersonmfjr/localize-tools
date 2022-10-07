import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  let store = {};

  beforeEach(() => {
    store = {};
    spyOn(window.localStorage, 'getItem').and.callFake(
      (key: string): string => {
        return store[key] || null;
      }
    );
    spyOn(window.localStorage, 'removeItem').and.callFake(
      (key: string): void => {
        delete store[key];
      }
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] = <string>value);
      }
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => {
      store = {};
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set an item when localStorage is available', () => {
    expect(service.set('foo', 'bar')).toBe(true);
    expect(service.get('foo')).toBe('bar');
  });

  it('should return null when item no exists', () => {
    expect(service.get('foo')).toBeNull();
  });

  it('should set and remove an item', () => {
    expect(service.set('foo', 'bar')).toBeTrue();
    expect(service.remove('foo')).toBeTrue();
    expect(service.get('foo')).toBeNull();
  });

  it('should clear the storage', () => {
    expect(service.set('foo', 'bar')).toBeTrue();
    expect(service.set('bar', 'foo')).toBeTrue();
    expect(service.clear()).toBeTrue();
    expect(service.get('foo')).toBeNull();
    expect(service.get('bar')).toBeNull();
  });

  it('should return falsy when localStorage is unavailable', () => {
    service.localStorage = null;

    expect(service.clear()).toBeFalsy();
    expect(service.get('foo')).toBeFalsy();
    expect(service.remove('foo')).toBeFalsy();
    expect(service.set('foo', 'bar')).toBeFalsy();
  });

  it('should isLocalStorageSupported be true when localStorage is available', () => {
    expect(service.isLocalStorageSupported).toBeTrue();
  });

  it('should isLocalStorageSupported be false when localStorage is unavailable', () => {
    service.localStorage = null;

    expect(service.isLocalStorageSupported).toBeFalse();
  });

  it('should emit new value to changes event when set an item', () => {
    let nextValue: any;

    service.changes.subscribe((value) => {
      nextValue = value;
    });
    const setted = service.set('foo', 'bar');
    expect(setted).toBeTrue();

    expect(nextValue).toEqual({ type: 'set', key: 'foo', value: 'bar' });
  });

  it('should emit new value to changes event when remove an item', () => {
    let nextValue: any;

    service.changes.subscribe((value) => {
      nextValue = value;
    });

    service.set('foo', 'bar');
    const removed = service.remove('foo');
    expect(removed).toBeTrue();

    expect(nextValue).toEqual({ type: 'remove', key: 'foo' });
  });
});
