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
import { NGQTRendererFactory } from './renderer';
import { NGQTSanitizer } from './ng-qt-sanitizer';

@NgModule({
  imports: [ApplicationModule],
  providers: [
    { provide: APP_ROOT, useValue: true },
    { provide: Sanitizer, useClass: NGQTSanitizer },
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: RendererFactory2, useExisting: NGQTRendererFactory },
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [ApplicationModule],
})
export class NGQTModule {
  constructor(@Optional() @SkipSelf() parentModule: NGQTModule) {
    // Prevents NativeScriptModule from getting imported multiple times
    throwIfAlreadyLoaded(parentModule, 'NGQTModule');
  }
}
