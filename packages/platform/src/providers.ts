import { PLATFORM_ID, StaticProvider } from '@angular/core';
import { ElementSchemaRegistry, ResourceLoader } from '@angular/compiler';
import { COMPILER_OPTIONS } from '@angular/core';
import { PlatformLocation } from '@angular/common';

import { FileSystemResourceLoader } from './fs-resource-loader';
import { NGQTElementSchemaRegistry } from './registry';
import { NGQTPlatformLocation } from './location';

export const PLATFORM_NGQT_ID = 'nodegui';

export const NGQT_COMPILER_PROVIDERS: StaticProvider[] = [
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
          useClass: NGQTElementSchemaRegistry,
          deps: [],
        },
      ],
    },
    multi: true,
  },
];

export const NGQT_INTERNAL_PLATFORM_PROVIDERS: StaticProvider[] = [
  {
    provide: PLATFORM_ID,
    useValue: PLATFORM_NGQT_ID,
  },
  {
    provide: PlatformLocation,
    useExisting: NGQTPlatformLocation,
  },
];
