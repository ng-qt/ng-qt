import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { createPlatformFactory } from '@angular/core';

import { NGQT_COMPILER_PROVIDERS, NGQT_INTERNAL_PLATFORM_PROVIDERS } from './providers';

export const platformDesktop = createPlatformFactory(platformCoreDynamic, 'platformNGQTDynamic', [
  ...NGQT_INTERNAL_PLATFORM_PROVIDERS,
  ...NGQT_COMPILER_PROVIDERS,
]) as any;
