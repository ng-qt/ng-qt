import { createPlatformFactory } from '@angular/core';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {
  NGQT_COMPILER_PROVIDERS,
  NGQT_INTERNAL_PLATFORM_PROVIDERS,
} from '@ng-qt/platform/src/providers';
import { NgQtPlatformRef } from '@ng-qt/common';

// TODO
export const platformDynamicTesting: NgQtPlatformRef = createPlatformFactory(
  platformBrowserDynamicTesting,
  'platformNgQtTesting',
  [...NGQT_INTERNAL_PLATFORM_PROVIDERS, ...NGQT_COMPILER_PROVIDERS],
);
