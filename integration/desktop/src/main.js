"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_1 = require("@ngq/platform");
const core_1 = require("@angular/core");
const app_module_1 = require("./app/app.module");
const environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_1.platformDesktop()
    .bootstrapModule(app_module_1.AppModule)
    .catch(e => console.error(e));
//# sourceMappingURL=main.js.map