import { NgModule, NgZone, Optional, SkipSelf } from '@angular/core';
import { ɵangular_packages_platform_browser_testing_testing_a } from '@angular/platform-browser/testing';
import { APP_ROOT_VIEW, throwIfAlreadyLoaded } from '@ng-qt/common';
import { NgQtModule } from '@ng-qt/core';

import { AppTestingView } from './app-testing-view';

// TODO
@NgModule({
  providers: [
    {
      provide: NgZone,
      // HINT: createNgZone (https://github.com/angular/angular/blob/7cc4225eb93398c83aac60914c96c60341cc90f0/packages/platform-browser/testing/src/browser_util.ts#L177)
      useFactory: ɵangular_packages_platform_browser_testing_testing_a,
    },
    {
      provide: APP_ROOT_VIEW,
      useClass: AppTestingView,
    },
  ],
  exports: [NgQtModule],
})
export class NgQtTestingModule {
  constructor(@Optional() @SkipSelf() parentModule: NgQtTestingModule) {
    // Prevents NativeScriptModule from getting imported multiple times
    throwIfAlreadyLoaded(parentModule, NgQtTestingModule.name);
  }
}
