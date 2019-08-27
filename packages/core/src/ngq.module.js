'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const core_1 = require('@angular/core');
const register_widget_1 = require('./register-widget');
const utils_1 = require('./utils');
const error_handler_1 = require('./error-handler');
const renderer_1 = require('./renderer');
let NGQModule = class NGQModule {
  constructor(parentModule) {
    // Prevents NativeScriptModule from getting imported multiple times
    utils_1.throwIfAlreadyLoaded(parentModule, 'NGQModule');
  }
};
NGQModule = tslib_1.__decorate(
  [
    core_1.NgModule({
      imports: [core_1.ApplicationModule],
      exports: [core_1.ApplicationModule],
      providers: [
        { provide: core_1.ɵAPP_ROOT, useValue: true },
        { provide: core_1.ErrorHandler, useFactory: error_handler_1.errorHandlerFactory },
        { provide: core_1.RendererFactory2, useExisting: renderer_1.NGQRendererFactory },
        // Register core widgets
        register_widget_1.registerWidget('View', () => require('@ng-qt/core/view').ViewWidget),
        register_widget_1.registerWidget('Image', () => require('@ng-qt/core/image').ImageWidget),
      ],
      schemas: [core_1.NO_ERRORS_SCHEMA],
    }),
    tslib_1.__param(0, core_1.Optional()),
    tslib_1.__param(0, core_1.SkipSelf()),
    tslib_1.__metadata('design:paramtypes', [NGQModule]),
  ],
  NGQModule,
);
exports.NGQModule = NGQModule;
//# sourceMappingURL=ng-qt.module.js.map
