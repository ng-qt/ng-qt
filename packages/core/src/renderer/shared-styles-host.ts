import { Injectable, NgZone, RendererType2 } from '@angular/core';
import { NodeWidget } from '@nodegui/nodegui';

@Injectable({
  providedIn: 'root',
})
export class NgQtSharedStylesHost /*implements SharedStylesHost */ {
  constructor(
    private readonly ngZone: NgZone,
  ) {}

  addStyles(hostWidget: NodeWidget, type: RendererType2) {
    const style = type.styles
      .join()
      .trim()
      .split('[_ngcontent-%COMP%]')
      .join('');

    if (style !== '') {
      this.ngZone.run(async () => {
        if (!hostWidget.objectName()) {
          hostWidget.setObjectName(type.id);
        }

        await hostWidget.setStyleSheet(style);
      });
    }
  }
}
