import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { createPlatformFactory } from '@angular/core';
import { NGQ_RENDERER_PROVIDERS } from '@ngq/renderer';

import { NGQ_COMPILER_PROVIDERS, NGQ_INTERNAL_PLATFORM_PROVIDERS } from './providers';
import { NGQPlatformRef } from './platform-ref';

const _platformNGQDynamic = createPlatformFactory(
  platformCoreDynamic,
  'platformNGQDynamic',
  [
    ...NGQ_INTERNAL_PLATFORM_PROVIDERS,
    ...NGQ_COMPILER_PROVIDERS,
    ...NGQ_RENDERER_PROVIDERS,
  ],
);

export function platformNGQ(extraProviders?: any[]): NGQPlatformRef {
  return new NGQPlatformRef(_platformNGQDynamic(extraProviders));
}
