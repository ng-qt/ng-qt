"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(`${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`);
    }
}
exports.throwIfAlreadyLoaded = throwIfAlreadyLoaded;
//# sourceMappingURL=utils.js.map