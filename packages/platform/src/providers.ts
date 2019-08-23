import { PLATFORM_ID, PLATFORM_INITIALIZER, StaticProvider } from '@angular/core';
import { ElementSchemaRegistry, ResourceLoader } from '@angular/compiler';
import { COMPILER_OPTIONS } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { APP_ROOT_VIEW, createRootView } from './app-root-view';
import { FileSystemResourceLoader } from './resource-loader';
import { NGQElementSchemaRegistry } from './registry';
import { NGQPlatformLocation } from './location';

export const PLATFORM_NGQ_ID = 'nodegui';

export const NGQ_COMPILER_PROVIDERS: StaticProvider[] = [
  {
    provide: COMPILER_OPTIONS,
    useValue: {
      providers: [
        {
          provide: ResourceLoader,
          useClass: FileSystemResourceLoader,
        },
        {
          provide: ElementSchemaRegistry,
          useClass: NGQElementSchemaRegistry,
        },
      ],
    },
    multi: true,
  },
];

export const NGQ_INTERNAL_PLATFORM_PROVIDERS: StaticProvider[] = [
  {
    provide: PLATFORM_ID,
    useValue: PLATFORM_NGQ_ID,
  },
  {
    provide: PlatformLocation,
    useExisting: NGQPlatformLocation,
  },
  {
    provide: PLATFORM_INITIALIZER,
    useFactory: createRootView,
    deps: [],
  },
];
