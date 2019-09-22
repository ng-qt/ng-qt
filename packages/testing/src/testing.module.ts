import { NgModule, NgZone } from '@angular/core';
import { APP_ROOT_VIEW } from '@ng-qt/common';
import { TestComponentRenderer } from '@angular/core/testing';
import { NgQtModule } from '@ng-qt/core';

import { NgQtTestComponentRenderer } from './test-component-renderer';
import { createNgZone, createAppTestingView } from './utils';

// TODO
@NgModule({
  providers: [
    {
      provide: NgZone,
      useFactory: createNgZone,
    },
    /*{
      provide: APP_ROOT_VIEW,
      useFactory: createAppTestingView,
    },*/
    {
      provide: TestComponentRenderer,
      useClass: NgQtTestComponentRenderer,
    },
  ],
  exports: [NgQtModule],
})
export class NgQtTestingModule {}
