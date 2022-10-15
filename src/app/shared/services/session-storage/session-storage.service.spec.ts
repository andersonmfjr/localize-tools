import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  let store = {};

  beforeEach(() => {
    store = {};
    spyOn(window.sessionStorage, 'getItem').and.callFake(
      (key: string): string => {
        return store[key] || null;
      }
    );
    spyOn(window.sessionStorage, 'removeItem').and.callFake(
      (key: string): void => {
        delete store[key];
      }
    );
    spyOn(window.sessionStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (store[key] = value as string);
      }
    );
    spyOn(window.sessionStorage, 'clear').and.callFake(() => {
      store = {};
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set an item when sessionStorage is available', () => {
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

  it('should return falsy when sessionStorage is unavailable', () => {
    service.sessionStorage = null;

    expect(service.clear()).toBeFalsy();
    expect(service.get('foo')).toBeFalsy();
    expect(service.remove('foo')).toBeFalsy();
    expect(service.set('foo', 'bar')).toBeFalsy();
  });

  it('should isSessionStorageSupported be true when sessionStorage is available', () => {
    expect(service.isSessionStorageSupported).toBeTrue();
  });

  it('should isSessionStorageSupported be false when sessionStorage is unavailable', () => {
    service.sessionStorage = null;

    expect(service.isSessionStorageSupported).toBeFalse();
  });

  it('should emit new value to changes event when set an item', () => {
    let nextValue: any;

    service.changes.subscribe(value => {
      nextValue = value;
    });
    const setted = service.set('foo', 'bar');
    expect(setted).toBeTrue();

    expect(nextValue).toEqual({ type: 'set', key: 'foo', value: 'bar' });
  });

  it('should emit new value to changes event when remove an item', () => {
    let nextValue: any;

    service.changes.subscribe(value => {
      nextValue = value;
    });

    service.set('foo', 'bar');
    const removed = service.remove('foo');
    expect(removed).toBeTrue();

    expect(nextValue).toEqual({ type: 'remove', key: 'foo' });
  });
});
