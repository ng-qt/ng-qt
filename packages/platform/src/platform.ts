// probably should provide these in polyfills
// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';

import { createPlatformFactory, platformCore } from '@angular/core';
import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';

import { NGQ_INTERNAL_PLATFORM_PROVIDERS } from './providers';

export const platformNGQ = createPlatformFactory(platformCore, 'platformNGQ', NGQ_INTERNAL_PLATFORM_PROVIDERS);

export const platformNGQDynamic = createPlatformFactory(
  platformCoreDynamic,
  'platformNGQDynamic',
  NGQ_INTERNAL_PLATFORM_PROVIDERS,
);
