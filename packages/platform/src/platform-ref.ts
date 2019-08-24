import { CompilerOptions, NgModuleFactory, NgModuleRef, PlatformRef, Type } from '@angular/core';

export class NGQPlatformRef extends PlatformRef {
  get injector() {
    return this.platform.injector;
  }

  get destroyed() {
    return this.platform.destroyed;
  }

  constructor(private readonly platform: PlatformRef) {
    super();
  }

  bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>): Promise<NgModuleRef<M>> {}

  bootstrapModule<M>(
    moduleType: Type<M>,
    compilerOptions?: CompilerOptions | CompilerOptions[],
  ): Promise<NgModuleRef<M>> {}

  onDestroy(cb: () => void): void {
    this.platform.onDestroy(cb);
  }

  destroy(): void {
    this.platform.destroy();
  }
}