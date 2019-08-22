import { PLATFORM_ID, PLATFORM_INITIALIZER, StaticProvider } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { NGQPlatformLocation } from './location';

export const PLATFORM_CUTE_ID = 'nodegui';

export const NGQ_INTERNAL_PLATFORM_PROVIDERS: StaticProvider[] = [
  {
    provide: PLATFORM_ID,
    useValue: PLATFORM_CUTE_ID,
  },
  {
    provide: PlatformLocation,
    useExisting: NGQPlatformLocation,
  },
];

export const NGQ_PLATFORM_PROVIDERS: StaticProvider[] = [
  /*
  {
    provide: PLATFORM_ID,
  },
  {
    provide: PLATFORM_INITIALIZER
  }
*/
];
