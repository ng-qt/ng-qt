"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const core_2 = require("@ngq/core");
const app_component_1 = require("./app.component");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    core_1.NgModule({
        declarations: [app_component_1.AppComponent],
        imports: [core_2.NGQModule],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map