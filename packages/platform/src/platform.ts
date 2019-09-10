import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { createPlatformFactory, platformCore } from '@angular/core';
import { NgQtPlatformRef } from '@ng-qt/common';

import {
  NGQT_COMPILER_PROVIDERS,
  NGQT_INTERNAL_PLATFORM_PROVIDERS,
} from './providers';

export const platformNgQtDynamic: NgQtPlatformRef = createPlatformFactory(
  platformCoreDynamic,
  'platformNgQtDynamic',
  [...NGQT_INTERNAL_PLATFORM_PROVIDERS, ...NGQT_COMPILER_PROVIDERS],
);

export const platformNgQt: NgQtPlatformRef = createPlatformFactory(
  platformCore,
  'platformNgQt',
  NGQT_INTERNAL_PLATFORM_PROVIDERS,
);
