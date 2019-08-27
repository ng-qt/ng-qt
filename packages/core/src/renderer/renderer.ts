import { NgZone, Renderer2, RendererStyleFlags2, Type } from '@angular/core';
// import { resolveWidget, isKnownWidget, isFlexLayout, isNodeLayout, getNextSibling } from '@ng-qt/platform';
import { FlexLayout, NodeLayout, NodeWidget } from '@nodegui/nodegui';
import { resolveWidget } from '@ng-qt/platform';

import { NgQtWidget } from '../ng-qt-widget';
import { getWidgetCtor } from '../utils';

export class NGQTRenderer implements Renderer2 {
  constructor(private readonly ngZone: NgZone) {}

  readonly data: { [p: string]: any };
  destroyNode: ((node: any) => void) | null;

  createWidget(name: string) {
    /*if (!isKnownWidget(name)) {
      // default widget all components inherit from
      name = 'View';
    }

    const widgetType = resolveWidget(name);
    return new widgetType();*/
  }

  addClass(el: any, name: string): void {
    console.log('addClass', arguments);
  }

  appendChild(parent: NodeWidget, newChild: NodeWidget): void {
    console.log('appendChild', arguments);
    /*if (!isFlexLayout(parent.layout)) {
      const flexLayout = new FlexLayout();

      const parentFlexNode = parent.getFlexNode();
      flexLayout.setFlexNode(parentFlexNode);

      parent.layout = flexLayout;
    }

    parent.layout.addWidget(newChild);*/
  }

  createComment(value: string): any {
    console.log('createComment', value);
  }

  createElement(name: string, namespace?: string | null): NgQtWidget {
    const widgetCtor = resolveWidget(name);
    return new widgetCtor();
  }

  createText(value: string): void {
    console.warn(`Use <Text /> component to add the text: ${value}`);
    throw new TypeError('NGQTRenderer: createText called when platform doesnt have host level text.');
  }

  destroy(): void {}

  insertBefore({ layout }: NodeWidget, newChild: NodeWidget, refChild: NodeWidget): void {
    console.log('insertBefore', arguments);
    /*if (isFlexLayout(layout)) {
      layout.insertChildBefore(newChild, refChild);
    }*/
  }

  listen(widget: NgQtWidget, eventName: string, callback: (event: any) => boolean | void): () => void {
    const { events, name } = getWidgetCtor(widget);
    if (!events.has(eventName)) {
      throw new TypeError(`${name} doesn't have event: ${eventName}`);
    }

    const zonedCallback = (...args: any) => this.ngZone.run(() => callback.apply(undefined, args));

    widget.addEventListener(eventName, zonedCallback);

    return () => widget.removeEventListener(eventName, zonedCallback);
  }

  nextSibling({ layout }: NodeWidget) {
    /*return isNodeLayout(layout)
      ? getNextSibling(layout)
      : null;*/
  }

  parentNode(node: NodeWidget): NodeLayout | null {
    console.log('parentNode', arguments);
    return node.layout || null;
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
    console.log('removeAttribute', arguments);
  }

  removeChild({ layout }: NodeWidget, oldChild: NodeWidget, isHostElement?: boolean): void {
    console.log('removeChild', arguments);
    /*if (isFlexLayout(layout)) {
      layout.removeWidget(oldChild);
    }*/
  }

  removeClass(el: any, name: string): void {
    console.log('removeClass', arguments);
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
    console.log('removeStyle', arguments);
  }

  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any {
    console.log('selectRootElement', arguments);
  }

  setAttribute(el: any, name: string, value: string, namespace?: string | null): void {
    console.log('setAttribute', arguments);
  }

  setProperty(el: any, name: string, value: any): void {
    console.log('setProperty', arguments);
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
    console.log('setStyle', arguments);
  }

  setValue(node: any, value: string): void {
    console.log('setValue', arguments);
  }
}
