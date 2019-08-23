import { NgZone, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { resolveWidget, isKnownWidget, isFlexLayout, isNodeLayout, getNextSibling } from '@ngq/platform';
import { FlexLayout, NodeLayout, NodeWidget } from '@nodegui/nodegui';
import { Component } from '@nodegui/nodegui/dist/lib/core/Component';

export class NGQRenderer implements Renderer2 {
  constructor(private readonly ngZone: NgZone) {}

  readonly data: { [p: string]: any };
  destroyNode: ((node: any) => void) | null;

  createWidget(name: string) {
    if (!isKnownWidget(name)) {
      // default widget all components inherit from
      name = 'View';
    }

    const widgetType = resolveWidget(name);
    return new widgetType();
  }

  addClass(el: any, name: string): void {
  }

  appendChild(parent: NodeWidget, newChild: NodeWidget): void {
    if (!isFlexLayout(parent.layout)) {
      const flexLayout = new FlexLayout();

      const parentFlexNode = parent.getFlexNode();
      flexLayout.setFlexNode(parentFlexNode);

      parent.layout = flexLayout;
    }

    parent.layout.addWidget(newChild);
  }

  createComment(value: string): any {
  }

  createElement(name: string, namespace?: string | null): any {
    console.log(name);
  }

  createText(value: string): void {
    console.warn(`Use <Text /> component to add the text: ${value}`);
    throw new TypeError('NGQRenderer: createText called when platform doesnt have host level text.');
  }

  destroy(): void {
  }

  insertBefore({ layout }: NodeWidget, newChild: NodeWidget, refChild: NodeWidget): void {
    if (isFlexLayout(layout)) {
      layout.insertChildBefore(newChild, refChild);
    }
  }

  listen(target: "window" | "document" | "body" | any, eventName: string, callback: (event: any) => (boolean | void)): () => void {
    console.log(target, eventName, callback);

    return function() {
    };
  }

  nextSibling({ layout }: NodeWidget) {
    return isNodeLayout(layout)
      ? getNextSibling(layout)
      : null;
  }

  parentNode(node: NodeWidget): NodeLayout | null {
    return node.layout || null;
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
  }

  removeChild({ layout }: NodeWidget, oldChild: NodeWidget, isHostElement?: boolean): void {
    if (isFlexLayout(layout)) {
      layout.removeWidget(oldChild);
    }
  }

  removeClass(el: any, name: string): void {
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
  }

  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any {
  }

  setAttribute(el: any, name: string, value: string, namespace?: string | null): void {
    console.log(el);
  }

  setProperty(el: any, name: string, value: any): void {
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
  }

  setValue(node: any, value: string): void {
  }
}