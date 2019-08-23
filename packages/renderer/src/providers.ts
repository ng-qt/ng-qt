import { StaticProvider, RendererFactory2 } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { NGQRendererFactory } from './renderer-factory';

export const NGQ_RENDERER_PROVIDERS: StaticProvider[] = [
  {
    provide: RendererFactory2,
    useExisting: NGQRendererFactory,
  },
];