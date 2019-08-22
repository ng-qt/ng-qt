import { Injectable, NgZone, Renderer2, RendererFactory2, RendererType2, ViewEncapsulation } from '@angular/core';

import { CuteRenderer } from './renderer';

@Injectable()
export class CuteRendererFactory2 implements RendererFactory2 {
  private readonly rendererByCompId = new Map<string, Renderer2>();
  private defaultRenderer = new CuteRenderer(this.ngZone);

  constructor(private readonly ngZone: NgZone) {}

  createRenderer(hostElement: any, type: RendererType2 | null): CuteRenderer {
    console.log(hostElement, type);
    if (!hostElement || !type) {
      return this.defaultRenderer;
    }

    switch (type.encapsulation) {
      // @TODO: Compile time / codelyzer rules
      case ViewEncapsulation.ShadowDom:
        throw new Error('Not supported');

      default: {
        if (!this.rendererByCompId.has(type.id)) {
          /*const styles = flattenStyles(type.id, type.styles, []);
          this.sharedStylesHost.addStyles(styles);*/
          this.rendererByCompId.set(type.id, this.defaultRenderer);
        }

        return this.defaultRenderer;
      }
    }
  }

  end(): void {}

  begin(): void {}
}