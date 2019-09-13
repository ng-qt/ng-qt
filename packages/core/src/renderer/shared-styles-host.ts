import { Injectable, NgZone, RendererType2 } from '@angular/core';
import { NodeWidget } from '@nodegui/nodegui';
import { NgQtView } from '@ng-qt/common';

export type InlineStyles =
  | string
  | { property: string; value: string | number };

@Injectable()
export class NgQtSharedStylesHost {
  constructor(private readonly ngZone: NgZone) {}

  private setNodeInlineStyle(node: NgQtView) {
    const inlineStyle = this.nodeStylesToInlineStyle(node);
    this.ngZone.runOutsideAngular(() => node.setInlineStyle(inlineStyle));
  }

  private nodeStylesToInlineStyle(node: NgQtView): string {
    return [...node.styles.entries()]
      .map(([prop, val]) => `${prop}: ${val}`)
      .join(';');
  }

  removeInlineStyle(node: NgQtView, property: string) {
    node.styles.delete(property);

    this.setNodeInlineStyle(node);
  }

  addInlineStyle(node: NgQtView, styles: InlineStyles) {
    if (typeof styles === 'object') {
      node.styles.set(styles.property, `${styles.value}`);
    } else {
      node.styles = new Map(
        styles.split(';').reduce((styles, style) => {
          const [prop, val] = style.split(':');

          return [...styles, [prop.trim(), val.trim()]];
        }, []),
      );
    }

    this.setNodeInlineStyle(node);
  }

  addHostStyles(hostWidget: NodeWidget, type: RendererType2) {
    let styles = type.styles.join().trim();

    if (styles !== '') {
      styles = styles.split('[_ngcontent-%COMP%]').join('');

      if (!hostWidget.objectName()) {
        hostWidget.setObjectName(type.id);
      }

      this.ngZone.runOutsideAngular(() => hostWidget.setStyleSheet(styles));
    }
  }
}
