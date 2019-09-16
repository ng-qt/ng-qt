import { Inject, NgZone, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { isKnownWidget, resolveWidget } from '@ng-qt/platform';
import { NativeEvent } from '@nodegui/nodegui';
import {
  APP_ROOT_VIEW,
  AppRootView,
  CommentNode,
  ElementReference,
  getClassName,
  getWidgetMeta,
  isFunc,
  isInvisibleNode,
  NgQtView,
  TextNode,
} from '@ng-qt/common';

import { NgQtSharedStylesHost } from './shared-styles-host';
import { ViewUtil } from './view-util';

export class NgQtRenderer implements Renderer2 {
  constructor(
    private readonly sharedStylesHost: NgQtSharedStylesHost,
    private readonly viewUtil: ViewUtil,
    private readonly ngZone: NgZone,
    @Inject(APP_ROOT_VIEW)
    private readonly rootView: AppRootView,
  ) {}

  readonly data: { [p: string]: any };
  destroyNode: ((node: any) => void) | null;

  createComment(value: string): CommentNode {
    return new CommentNode(value);
  }

  // do validation when appending child
  createText(value: string): TextNode {
    return new TextNode(value);
  }

  addClass(el: any, name: string): void {
    console.log('addClass', arguments);
  }

  appendChild(parent: NgQtView, newChild: NgQtView): void {
    this.viewUtil.insertChild(parent, newChild);
  }

  createElement(name: string, namespace?: string | null): NgQtView {
    if (!isKnownWidget(name)) name = 'View';

    const widgetCtor = resolveWidget(name);
    const instance = new widgetCtor();
    instance.styles = new Map();
    return instance;
  }

  destroy(): void {
    console.log('destroy');
  }

  insertBefore(
    parent: NgQtView,
    newChild: NgQtView,
    { previous, next }: ElementReference,
  ): void {
    this.viewUtil.insertChild(parent, newChild, previous, next);
  }

  listen(
    widget: NgQtView,
    eventName: string,
    callback: (event: any) => boolean | void,
  ): () => void {
    const { events, name } = getWidgetMeta(widget);
    const realEvent = events.get(eventName);

    if (!realEvent) {
      throw new TypeError(`${name} doesn't have event: ${eventName}`);
    }

    const zonedCallback = (nativeEvent: NativeEvent) =>
      this.ngZone.run(() => callback.call(undefined, nativeEvent));

    widget.addEventListener(realEvent, zonedCallback);

    return () => widget.removeEventListener(realEvent, zonedCallback);
  }

  nextSibling(node: NgQtView): ElementReference {
    return {
      previous: node,
      next: node.nextSibling,
    };
  }

  parentNode(view: NgQtView): NgQtView {
    return view.parentNode;
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
    console.log('removeAttribute', arguments);
  }

  removeChild(
    parent: NgQtView,
    oldChild: NgQtView,
    isHostElement?: boolean,
  ): void {
    this.viewUtil.removeChild(parent, oldChild);
  }

  removeClass(el: any, name: string): void {
    console.log('removeClass', arguments);
  }

  selectRootElement(selectorOrNode: string, preserveContent?: boolean) {
    const view = this.createElement('View');
    this.appendChild(this.rootView, view);
    return view;
  }

  setAttribute(
    widget: NgQtView,
    name: string,
    value: any,
    namespace?: string | null,
  ): void {
    if (name === 'ng-version') return;

    if (name === 'style') {
      return this.sharedStylesHost.addInlineStyle(widget, value);
    }

    const { name: widgetName, attrs } = getWidgetMeta(widget);

    if (attrs) {
      const method = attrs.get(name);

      if (method) {
        widget[method].call(widget, value);
      } else {
        // widget.setProperty();
        console.warn(`Attribute ${name} doesn't exist on widget ${widgetName}`);
      }
    }
  }

  setProperty(widget: NgQtView, name: string, value: any): void {
    this.setAttribute(widget, name, value);
  }

  setStyle(
    node: NgQtView,
    property: string,
    value: any,
    flags?: RendererStyleFlags2,
  ): void {
    this.sharedStylesHost.addInlineStyle(node, {
      property,
      value,
    });
  }

  removeStyle(
    node: NgQtView,
    property: string,
    flags?: RendererStyleFlags2,
  ): void {
    this.sharedStylesHost.removeInlineStyle(node, property);
  }

  setValue(node: NgQtView, value: any): void {
    if (
      isInvisibleNode(node) &&
      node.parentNode &&
      isFunc(node.parentNode.insertChild)
    ) {
      node.value = value;
      node.parentNode.insertChild(node);
    }
  }
}
