import {
  ErrorHandler,
  NgModule,
  NO_ERRORS_SCHEMA,
  Optional,
  RendererFactory2,
  SkipSelf,
  ApplicationModule,
  ɵAPP_ROOT as APP_ROOT,
} from '@angular/core';

import { registerWidget } from './register-widget';
import { throwIfAlreadyLoaded } from './utils';
import { errorHandlerFactory } from './error-handler';
import { NGQRendererFactory } from './renderer';

@NgModule({
  imports: [ApplicationModule],
  exports: [ApplicationModule],
  providers: [
    { provide: APP_ROOT, useValue: true },
    { provide: ErrorHandler, useFactory: errorHandlerFactory },
    { provide: RendererFactory2, useExisting: NGQRendererFactory },
    // Register core widgets
    registerWidget('View', () => require('@ngq/core/view').ViewWidget),
    registerWidget('Image', () => require('@ngq/core/image').ImageWidget),
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NGQModule {
  constructor(@Optional() @SkipSelf() parentModule: NGQModule) {
    // Prevents NativeScriptModule from getting imported multiple times
    throwIfAlreadyLoaded(parentModule, 'NGQModule');
  }
}