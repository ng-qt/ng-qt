import { NgZone, Provider, RendererFactory2 } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { CuteRendererFactory2 } from './factory';

export function createCuteRendererFactory(ngZone: NgZone) {
  return new CuteRendererFactory2(ngZone);
}

export const CUTE_RENDERER_PROVIDERS: Provider[] = [
  {
    provide: RendererFactory2,
    useFactory: createCuteRendererFactory,
    deps: [NgZone],
  },
];