import { NgZone, Renderer2, RendererStyleFlags2 } from '@angular/core';
// import { resolveWidget, isKnownWidget, isFlexLayout, isNodeLayout, getNextSibling } from '@ng-qt/platform';
import { FlexLayout, NodeLayout, NodeWidget } from '@nodegui/nodegui';

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
    console.log(arguments);
  }

  appendChild(parent: NodeWidget, newChild: NodeWidget): void {
    console.log(arguments);
    /*if (!isFlexLayout(parent.layout)) {
      const flexLayout = new FlexLayout();

      const parentFlexNode = parent.getFlexNode();
      flexLayout.setFlexNode(parentFlexNode);

      parent.layout = flexLayout;
    }

    parent.layout.addWidget(newChild);*/
  }

  createComment(value: string): any {}

  createElement(name: string, namespace?: string | null): any {
    console.log(arguments);
  }

  createText(value: string): void {
    console.warn(`Use <Text /> component to add the text: ${value}`);
    throw new TypeError('NGQTRenderer: createText called when platform doesnt have host level text.');
  }

  destroy(): void {}

  insertBefore({ layout }: NodeWidget, newChild: NodeWidget, refChild: NodeWidget): void {
    console.log(arguments);
    /*if (isFlexLayout(layout)) {
      layout.insertChildBefore(newChild, refChild);
    }*/
  }

  listen(
    target: 'window' | 'document' | 'body' | any,
    eventName: string,
    callback: (event: any) => boolean | void,
  ): () => void {
    console.log(arguments);

    return function() {};
  }

  nextSibling({ layout }: NodeWidget) {
    /*return isNodeLayout(layout)
      ? getNextSibling(layout)
      : null;*/
  }

  parentNode(node: NodeWidget): NodeLayout | null {
    console.log(arguments);
    return node.layout || null;
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
    console.log(arguments);
  }

  removeChild({ layout }: NodeWidget, oldChild: NodeWidget, isHostElement?: boolean): void {
    console.log(arguments);
    /*if (isFlexLayout(layout)) {
      layout.removeWidget(oldChild);
    }*/
  }

  removeClass(el: any, name: string): void {
    console.log(arguments);
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
    console.log(arguments);
  }

  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any {
    console.log(arguments);
  }

  setAttribute(el: any, name: string, value: string, namespace?: string | null): void {
    console.log(arguments);
  }

  setProperty(el: any, name: string, value: any): void {
    console.log(arguments);
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
    console.log(arguments);
  }

  setValue(node: any, value: string): void {
    console.log(arguments);
  }
}
