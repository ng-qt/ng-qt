import { FlexLayout, NodeLayout, NodeWidget } from '@nodegui/nodegui';
import { camelCase } from 'change-case';

import { NgQtView, WidgetMeta, WidgetMetaOptions, WidgetType } from './interfaces';
import { InvisibleNode } from './nodes';
import { WIDGET_META } from './tokens';

export function createWidgetAttrs(attrs: WidgetMetaOptions['attrs']): WidgetMeta['attrs'] {
  return new Map(Object.entries(attrs));
}

// TODO: we need a past tense to present converter
export function createWidgetEvents(events: WidgetMetaOptions['events']): WidgetMeta['events'] {
  return new Map(
    Object.entries(events).map(([eventName, realEventName]) => [
      camelCase(eventName),
      realEventName,
    ]),
  );
}

export function getWidgetMeta(widget: WidgetType | NgQtView): WidgetMeta {
  const target = isInstance(widget) ? widget.constructor : widget;

  return Reflect.getMetadata(WIDGET_META, target);
}

export function getWidgetCtor(widget: NgQtView): WidgetType {
  return <WidgetType>widget.constructor;
}

export function isNodeWidget(widget: any): widget is NodeWidget {
  return widget instanceof NodeWidget;
}

export function isFlexLayout(layout: any): layout is FlexLayout {
  return layout instanceof FlexLayout;
}

export function isNodeLayout(layout: any): layout is NodeLayout {
  return layout instanceof NodeLayout;
}

export function isStr(val: any): val is string {
  return typeof val === 'string';
}

export function isNil(val: any): val is undefined | null {
  return val == null;
}

export function hasViewMeta(view: NgQtView): boolean {
  return isInstance(view) && 'meta' in view;
}

export function isFunc(val: any): val is Function {
  return typeof val === 'function';
}

export function isDetachedElement(view: NgQtView): boolean {
  return hasViewMeta(view) && view.meta.skipAddToDom;
}

export function isParentNodeFlexLayout(parent: NgQtView): boolean {
  return (
    isNodeWidget(parent) &&
    isNodeWidget(parent.parentNode) &&
    isFlexLayout(parent.parentNode.layout)
  );
}

export function isInstance<T = object>(obj: T): boolean {
  return typeof obj === 'object' && 'constructor' in obj;
}

export function isInvisibleNode(val: any): val is InvisibleNode {
  return val instanceof InvisibleNode;
}
