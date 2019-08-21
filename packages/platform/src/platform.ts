import { createPlatformFactory, platformCore } from '@angular/core';

import { CUTE_PLATFORM_PROVIDERS } from './providers';

export const platformCute = createPlatformFactory(platformCore, 'platformCute', CUTE_PLATFORM_PROVIDERS);