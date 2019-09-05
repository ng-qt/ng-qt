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

  return Reflect.getMetadata(WIDGET_META, target) || {};
}

export function getWidgetCtor(widget: NgQtView): WidgetType {
  return <WidgetType>widget.constructor;
}

export function isView(view: any): view is NgQtView {
  return view instanceof NodeWidget;
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

export function isDetachedElement(node: NodeWidget): boolean {
  if (isInvisibleNode(node)) return true;

  const { skipAddToDom } = getWidgetMeta(node);
  return skipAddToDom;
}

/*export function isParentNodeFlexLayout(child: NgQtView): boolean {
  return (
    isNodeWidget(child) && isNodeWidget(child.parentNode) && isFlexLayout(child.parentNode.layout)
  );
}*/

export function isInstance<T = object>(obj: T): boolean {
  return typeof obj === 'object' && 'constructor' in obj;
}

export function isInvisibleNode(val: any): val is InvisibleNode {
  return val instanceof InvisibleNode;
}

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`,
    );
  }
}
