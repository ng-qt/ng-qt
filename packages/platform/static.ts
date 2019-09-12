import 'zone.js/dist/zone';
import 'reflect-metadata';

import { createPlatformFactory, platformCore } from '@angular/core';
import { NgQtPlatformRef } from '@ng-qt/common';

import { NGQT_INTERNAL_PLATFORM_PROVIDERS } from './src/providers';

export const platformNgQt: NgQtPlatformRef = createPlatformFactory(
  platformCore,
  'platformNgQt',
  NGQT_INTERNAL_PLATFORM_PROVIDERS,
);
