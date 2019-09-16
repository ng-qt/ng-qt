import { Injectable, NgZone, RendererType2 } from '@angular/core';
import { NodeWidget } from '@nodegui/nodegui';
import { NgQtView } from '@ng-qt/common';

export const COMPONENT_VARIABLE = '%COMP%';
export const HOST_ATTR = `[_nghost-${COMPONENT_VARIABLE}]`;
export const CONTENT_ATTR = `[_ngcontent-${COMPONENT_VARIABLE}]`;
const ATTR_SANITIZER = /-/g;

export type InlineStyles = string | { property: string; value: string };

@Injectable()
export class NgQtSharedStylesHost {
  constructor(private readonly ngZone: NgZone) {}

  private setNodeInlineStyle(node: NgQtView) {
    const inlineStyle = this.nodeStylesToInlineStyle(node);
    this.ngZone.run(() => node.setInlineStyle(inlineStyle));
  }

  private nodeStylesToInlineStyle(node: NgQtView): string {
    return [...node.styles.entries()].map(s => s.join(':')).join(';');
  }

  removeInlineStyle(node: NgQtView, property: string) {
    node.styles.delete(property);

    this.setNodeInlineStyle(node);
  }

  addInlineStyle(node: NgQtView, styles: InlineStyles) {
    if (typeof styles === 'object') {
      node.styles.set(styles.property, styles.value);
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
      styles = styles.split(CONTENT_ATTR).join('');
      styles = styles.split(HOST_ATTR).join(`#${type.id}`);

      this.ngZone.run(() => hostWidget.setStyleSheet(styles));
    }
  }
}
