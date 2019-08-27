import { CompilerOptions, NgModuleFactory, NgModuleRef, PlatformRef, Type } from '@angular/core';

export class NGQTPlatformRef implements PlatformRef {
  get injector() {
    return this.platform.injector;
  }

  get destroyed() {
    return this.platform.destroyed;
  }

  constructor(private readonly platform: PlatformRef) {}

  bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>): Promise<NgModuleRef<M>> {
    return this.platform.bootstrapModuleFactory(moduleFactory);
  }

  bootstrapModule<M>(
    moduleType: Type<M>,
    compilerOptions?: CompilerOptions | CompilerOptions[],
  ): Promise<NgModuleRef<M>> {
    return this.platform.bootstrapModule(moduleType, compilerOptions);
  }

  onDestroy(cb: () => void): void {
    this.platform.onDestroy(cb);
  }

  destroy(): void {
    this.platform.destroy();
  }
}
