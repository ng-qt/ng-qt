import { Injectable, NgZone, Renderer2, RendererFactory2, RendererType2, ViewEncapsulation } from '@angular/core';

import { NGQTRenderer } from './renderer';

@Injectable({
  providedIn: 'root',
})
export class NGQTRendererFactory implements RendererFactory2 {
  private readonly rendererByCompId = new Map<string, NGQTRenderer>();
  private defaultRenderer = new NGQTRenderer(this.ngZone);

  constructor(private readonly ngZone: NgZone) {}

  createRenderer(hostElement: any, type: RendererType2 | null): NGQTRenderer {
    console.log('createRenderer', hostElement, type);
    if (!hostElement || !type) {
      return this.defaultRenderer;
    }

    if (!this.rendererByCompId.has(type.id)) {
      this.rendererByCompId.set(type.id, this.defaultRenderer);
    }

    return this.rendererByCompId.get(type.id)!;

    /*switch (type.encapsulation) {
      // @TODO: Compile time / codelyzer rules
      case ViewEncapsulation.ShadowDom:
        throw new Error('Not supported');

      default: {
        if (!this.rendererByCompId.has(type.id)) {
          // const styles = flattenStyles(type.id, type.styles, []);
          // this.sharedStylesHost.addStyles(styles);
          this.rendererByCompId.set(type.id, this.defaultRenderer);
        }

        return this.defaultRenderer;
      }
    }*/
  }

  end(): void {}

  begin(): void {}
}
