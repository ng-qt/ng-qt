import { PLATFORM_ID, StaticProvider } from '@angular/core';
import { ElementSchemaRegistry, ResourceLoader } from '@angular/compiler';
import { COMPILER_OPTIONS } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { FileSystemResourceLoader } from './fs-resource-loader';
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
          deps: [],
        },
        {
          provide: ElementSchemaRegistry,
          useClass: NGQElementSchemaRegistry,
          deps: [],
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
];
