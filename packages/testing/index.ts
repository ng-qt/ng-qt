import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'jest-preset-angular/zone-patch';

import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NGQT_COMPILER_PROVIDERS } from '@ng-qt/platform/src/providers';
import { getTestBed } from '@angular/core/testing';

import { NgQtTestingModule } from './src/testing.module';

getTestBed().initTestEnvironment(
  NgQtTestingModule,
  platformBrowserDynamicTesting(NGQT_COMPILER_PROVIDERS),
);
