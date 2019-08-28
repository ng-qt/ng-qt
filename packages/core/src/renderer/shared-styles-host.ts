import { Injectable, NgZone, RendererType2 } from '@angular/core';
import { NodeWidget } from '@nodegui/nodegui';

@Injectable({
  providedIn: 'root',
})
export class NgQtSharedStylesHost /*implements SharedStylesHost */ {
  constructor(private readonly ngZone: NgZone) {}

  addStyles(hostWidget: NodeWidget, type: RendererType2) {
    let styles = type.styles.join().trim();

    if (styles !== '') {
      this.ngZone.run(async () => {
        styles = styles.split('[_ngcontent-%COMP%]').join('');

        if (!hostWidget.objectName()) {
          hostWidget.setObjectName(type.id);
        }

        await hostWidget.setStyleSheet(styles);
      });
    }
  }
}
