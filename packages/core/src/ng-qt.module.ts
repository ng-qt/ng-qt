import { APP_ROOT_VIEW, AppRootView } from '@ng-qt/platform';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import {
  ErrorHandler,
  NgModule,
  Optional,
  RendererFactory2,
  SkipSelf,
  ApplicationModule,
  ɵAPP_ROOT as APP_ROOT,
  Sanitizer,
} from '@angular/core';

import { NgQtRendererFactory, NgQtSharedStylesHost } from './renderer';
import { throwIfAlreadyLoaded } from './utils';
import { errorHandlerFactory } from './error-handler';
import { NgQtSanitizer } from './sanitizer';

@NgModule({
  imports: [ApplicationModule],
  providers: [
    { provide: APP_ROOT, useValue: true },
    { provide: Sanitizer, useClass: NgQtSanitizer },
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: APP_ROOT_VIEW, useClass: AppRootView },
    { provide: SharedStylesHost, useExisting: NgQtSharedStylesHost },
    { provide: RendererFactory2, useExisting: NgQtRendererFactory },
  ],
  exports: [ApplicationModule],
})
export class NgQtModule {
  constructor(@Optional() @SkipSelf() parentModule: NgQtModule) {
    // Prevents NativeScriptModule from getting imported multiple times
    throwIfAlreadyLoaded(parentModule, NgQtModule.name);
  }
}
