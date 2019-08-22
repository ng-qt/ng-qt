import { PLATFORM_ID, PLATFORM_INITIALIZER, StaticProvider } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { QPlatformLocation } from './location';

export const PLATFORM_CUTE_ID = 'nodegui';

export const INTERNAL_PLATFORM_PROVIDERS: StaticProvider[] = [
  {
    provide: PLATFORM_ID,
    useValue: PLATFORM_CUTE_ID,
  },
  {
    provide: PlatformLocation,
    useClass: QPlatformLocation,
    deps: [],
  },
];

export const PLATFORM_PROVIDERS: StaticProvider[] = [/*
  {
    provide: PLATFORM_ID,
  },
  {
    provide: PLATFORM_INITIALIZER
  }
*/];