"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const compiler_1 = require("@angular/compiler");
const core_2 = require("@angular/core");
const common_1 = require("@angular/common");
const fs_resource_loader_1 = require("./fs-resource-loader");
const registry_1 = require("./registry");
const location_1 = require("./location");
exports.PLATFORM_NGQ_ID = 'nodegui';
exports.NGQ_COMPILER_PROVIDERS = [
    {
        provide: core_2.COMPILER_OPTIONS,
        useValue: {
            providers: [
                {
                    provide: compiler_1.ResourceLoader,
                    useClass: fs_resource_loader_1.FileSystemResourceLoader,
                },
                {
                    provide: compiler_1.ElementSchemaRegistry,
                    useClass: registry_1.NGQElementSchemaRegistry,
                },
            ],
        },
        multi: true,
    },
];
exports.NGQ_INTERNAL_PLATFORM_PROVIDERS = [
    {
        provide: core_1.PLATFORM_ID,
        useValue: exports.PLATFORM_NGQ_ID,
    },
    {
        provide: common_1.PlatformLocation,
        useExisting: location_1.NGQPlatformLocation,
    },
];
//# sourceMappingURL=providers.js.map