import { Injectable } from '@angular/core';
import { LocationChangeListener, PlatformLocation } from '@angular/common';

import { Location } from './location.interface';
import { parseUrl } from './parse-url';

// Should've extended ServerPlatformLocation but it's private
/**
 * Node Gui implementation of URL state. Implements `pathname`, `search`, and `hash`
 * but not the state stack.
 */
@Injectable({
  providedIn: 'root',
})
export class NGQTPlatformLocation implements PlatformLocation, Location {
  public readonly href = '/';
  public readonly hostname = '/';
  public readonly protocol = '/';
  public readonly port = '/';
  public readonly pathname = '/';
  public readonly search = '';
  public readonly hash = '';

  constructor() {
    // this.location = parseUrl();
  }

  back(): void {}

  forward(): void {}

  getBaseHrefFromDOM(): string {
    return '';
  }

  getState(): unknown {
    return undefined;
  }

  onHashChange(fn: LocationChangeListener): void {}

  onPopState(fn: LocationChangeListener): void {}

  pushState(state: any, title: string, url: string): void {}

  replaceState(state: any, title: string, url: string): void {}
}
