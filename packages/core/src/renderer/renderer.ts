import { NgZone, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { FlexLayout, NodeLayout, NodeWidget, QLabel } from '@nodegui/nodegui';
import { AppRootView, isKnownWidget, resolveWidget } from '@ng-qt/platform';

import { getWidgetCtor, isFlexLayout } from '../utils';

export class NgQtRenderer implements Renderer2 {
  constructor(
    private readonly ngZone: NgZone,
    private readonly rootView: AppRootView,
  ) {}

  readonly data: { [p: string]: any };
  destroyNode: ((node: any) => void) | null;

  addClass(el: any, name: string): void {
    // console.log('addClass', arguments);
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
    // console.log('createComment', value);
  }

  createElement<W extends NodeWidget>(name: string, namespace?: string | null): W {
    if (!isKnownWidget(name)) name = 'View';

    const widgetCtor = resolveWidget<W>(name);
    return new widgetCtor();
  }

  createText(value: string) {
    const text = this.createElement<any>('Text');
    text.setText(value);
    return text;
    /*console.warn(`Use <Text /> component to add the text: ${value}`);
    throw new TypeError(
      this.constructor.name + ': createText called when platform doesnt have host level text.',
    );*/
  }

  destroy(): void {}

  insertBefore({ layout }: NodeWidget, newChild: NodeWidget, refChild: NodeWidget): void {
    if (isFlexLayout(layout)) {
      layout.insertChildBefore(newChild, refChild);
    }
  }

  listen(
    widget: NodeWidget,
    eventName: string,
    callback: (event: any) => boolean | void,
  ): () => void {
    const { events, name } = getWidgetCtor(widget);
    const realEvent = events.get(eventName);

    if (!realEvent) {
      throw new TypeError(`${name} doesn't have event: ${eventName}`);
    }

    const zonedCallback = (...args: any) => this.ngZone.run(() => callback.apply(undefined, args));

    widget.addEventListener(realEvent, zonedCallback);

    return () => widget.removeEventListener(realEvent, zonedCallback);
  }

  nextSibling({ layout }: NodeWidget) {
    /*return isNodeLayout(layout)
      ? getNextSibling(layout)
      : null;*/
  }

  parentNode(node: NodeWidget): NodeLayout | null {
    // console.log('parentNode', arguments);
    return node.layout || null;
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
    // console.log('removeAttribute', arguments);
  }

  removeChild({ layout }: NodeWidget, oldChild: NodeWidget, isHostElement?: boolean): void {
    if (isFlexLayout(layout)) {
      layout.removeWidget(oldChild);
    }
  }

  removeClass(el: any, name: string): void {
    // console.log('removeClass', arguments);
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
    // console.log('removeStyle', arguments);
  }

  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): NodeWidget {
    this.rootView.centralWidget.setObjectName(selectorOrNode);
    this.rootView.show();

    return this.rootView;
  }

  setAttribute(widget: NodeWidget, name: string, value: string, namespace?: string | null): void {
    const { name: widgetName, attrs } = getWidgetCtor(widget);

    if (attrs) {
      const method = attrs.get(name);

      if (method) {
        widget[method].call(widget, value);
      } else {
        console.warn(`Attribute ${name} doesn't exist on widget ${widgetName}`);
      }
    }
  }

  setProperty(el: any, name: string, value: any): void {
    console.log('setProperty', arguments);
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
    // console.log('setStyle', arguments);
  }

  setValue(node: any, value: string): void {
    // console.log('setValue', arguments);
  }
}
