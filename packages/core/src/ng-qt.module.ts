import { AppWindow } from '@ng-qt/platform';
import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { APP_ROOT_VIEW, throwIfAlreadyLoaded } from '@ng-qt/common';
import {
  ApplicationModule,
  ErrorHandler,
  NgModule,
  Optional,
  RendererFactory2,
  Sanitizer,
  SkipSelf,
  ɵAPP_ROOT as APP_ROOT,
} from '@angular/core';

import { NgQtRendererFactory, NgQtSharedStylesHost } from './renderer';
import { errorHandlerFactory } from './error-handler';
import { NgQtSanitizer } from './sanitizer';

@NgModule({
  providers: [
    { provide: APP_ROOT, useValue: true },
    { provide: Sanitizer, useClass: NgQtSanitizer },
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: APP_ROOT_VIEW, useClass: AppWindow },
    { provide: SharedStylesHost, useExisting: NgQtSharedStylesHost },
    { provide: RendererFactory2, useExisting: NgQtRendererFactory },
  ],
  exports: [ApplicationModule, CommonModule],
})
export class NgQtModule {
  constructor(@Optional() @SkipSelf() parentModule: NgQtModule) {
    // Prevents NativeScriptModule from getting imported multiple times
    throwIfAlreadyLoaded(parentModule, NgQtModule.name);
  }
}
