import { Injectable, NgZone, RendererType2 } from '@angular/core';
import { NgQtView } from '@ng-qt/common';
import {
  HOST_ATTR as NG_HOST_ATTR,
  CONTENT_ATTR as NG_CONTENT_ATTR,
} from '@angular/compiler';

export const HOST_ATTR = `[${NG_HOST_ATTR}]`;
export const CONTENT_ATTR = `[${NG_CONTENT_ATTR}]`;

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

  addHostStyles(hostView: NgQtView, type: RendererType2) {
    let styles = type.styles.join('').trim();

    if (styles !== '') {
      styles = styles.split(CONTENT_ATTR).join('');
      styles = styles.split(HOST_ATTR).join(`#${type.id}`);

      this.ngZone.run(() => hostView.setStyleSheet(styles));
    }
  }
}
