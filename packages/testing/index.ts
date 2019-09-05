import 'reflect-metadata';
import 'zone.js/dist/zone-node';

import { getTestBed } from '@angular/core/testing';

import { platformDynamicTesting } from './src/platform-dynamic-testing';
import { NgQtTestingModule } from './src/testing.module';

getTestBed().initTestEnvironment(NgQtTestingModule, platformDynamicTesting());
