import { APP_ROOT_VIEW, AppRootView } from '@ng-qt/common';
import { NodeWidget } from '@nodegui/nodegui';
import {
  Inject,
  Injectable,
  NgZone,
  RendererFactory2,
  RendererType2,
} from '@angular/core';

import { NgQtSharedStylesHost } from './shared-styles-host';
import { NgQtRenderer } from './renderer';
import { ViewUtil } from './view-util';

@Injectable()
export class NgQtRendererFactory implements RendererFactory2 {
  private readonly rendererByCompId = new Map<string, NgQtRenderer>();
  private readonly viewUtil = new ViewUtil();
  private readonly defaultRenderer: NgQtRenderer;

  constructor(
    private readonly sharedStylesHost: NgQtSharedStylesHost,
    private readonly ngZone: NgZone,
    @Inject(APP_ROOT_VIEW)
    private readonly rootView: AppRootView,
  ) {
    this.defaultRenderer = new NgQtRenderer(
      this.sharedStylesHost,
      this.viewUtil,
      this.ngZone,
      this.rootView,
    );
  }

  createRenderer(
    hostWidget: NodeWidget,
    type: RendererType2 | null,
  ): NgQtRenderer {
    if (!hostWidget || !type) {
      return this.defaultRenderer;
    }

    if (!this.rendererByCompId.has(type.id)) {
      hostWidget.setObjectName(type.id);

      this.sharedStylesHost.addHostStyles(hostWidget, type);
      this.rendererByCompId.set(type.id, this.defaultRenderer);
    }

    return this.rendererByCompId.get(type.id);
  }

  end(): void {}

  begin(): void {}
}
