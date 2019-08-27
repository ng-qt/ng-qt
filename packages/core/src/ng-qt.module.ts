import {
  ErrorHandler,
  NgModule,
  NO_ERRORS_SCHEMA,
  Optional,
  RendererFactory2,
  SkipSelf,
  ApplicationModule,
  ɵAPP_ROOT as APP_ROOT,
  Sanitizer,
} from '@angular/core';

import { throwIfAlreadyLoaded } from './utils';
import { errorHandlerFactory } from './error-handler';
import { NgQtRendererFactory } from './renderer';
import { NgQtSanitizer } from './sanitizer';

@NgModule({
  imports: [ApplicationModule],
  providers: [
    { provide: APP_ROOT, useValue: true },
    { provide: Sanitizer, useClass: NgQtSanitizer },
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: RendererFactory2, useExisting: NgQtRendererFactory },
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [ApplicationModule],
})
export class NgQtModule {
  constructor(@Optional() @SkipSelf() parentModule: NgQtModule) {
    // Prevents NativeScriptModule from getting imported multiple times
    throwIfAlreadyLoaded(parentModule, NgQtModule.name);
  }
}
