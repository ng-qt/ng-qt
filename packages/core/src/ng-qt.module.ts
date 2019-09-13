import { ɵSharedStylesHost as SharedStylesHost } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { APP_ROOT_VIEW, throwIfAlreadyLoaded } from '@ng-qt/common';
import { resolveWidget } from '@ng-qt/platform';
import {
  ApplicationModule,
  ErrorHandler,
  NgModule,
  NO_ERRORS_SCHEMA,
  Optional,
  RendererFactory2,
  Sanitizer,
  SkipSelf,
  ɵAPP_ROOT as APP_ROOT,
} from '@angular/core';

import { NgQtRendererFactory, NgQtSharedStylesHost } from './renderer';
import { errorHandlerFactory } from './error-handler';
import { NgQtSanitizer } from './sanitizer';

export function createAppRootView() {
  const windowCtor = resolveWidget('Window');
  return new windowCtor();
}

@NgModule({
  imports: [ApplicationModule, CommonModule],
  providers: [
    NgQtRendererFactory,
    NgQtSharedStylesHost,
    { provide: APP_ROOT, useValue: true },
    { provide: Sanitizer, useClass: NgQtSanitizer },
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: APP_ROOT_VIEW, useFactory: createAppRootView },
    { provide: SharedStylesHost, useExisting: NgQtSharedStylesHost },
    { provide: RendererFactory2, useExisting: NgQtRendererFactory },
  ],
  exports: [ApplicationModule, CommonModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NgQtModule {
  constructor(@Optional() @SkipSelf() parentModule: NgQtModule) {
    throwIfAlreadyLoaded(parentModule, NgQtModule.name);
  }
}
