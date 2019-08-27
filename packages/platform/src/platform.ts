import { ɵplatformCoreDynamic as platformCoreDynamic } from '@angular/platform-browser-dynamic';
import { createPlatformFactory } from '@angular/core';

import { NGQT_COMPILER_PROVIDERS, NGQT_INTERNAL_PLATFORM_PROVIDERS } from './providers';
// import { NGQTPlatformRef } from './platform-ref';

export const platformNgQt = createPlatformFactory(platformCoreDynamic, 'platformNGQTDynamic', [
  ...NGQT_INTERNAL_PLATFORM_PROVIDERS,
  ...NGQT_COMPILER_PROVIDERS,
]);

/*export function platformNGQT(extraProviders?: any[]): NGQTPlatformRef {
  return new NGQTPlatformRef(_platformNGQTDynamic(extraProviders));
}*/

export const platformDesktop = platformNgQt;
