import { FlexLayout, NodeWidget } from '@nodegui/nodegui';
import { camelCase } from 'change-case';

import { WidgetType } from './widget-type.interface';

export function createWidgetAttributes(attrs: Record<string, string>): Map<string, string> {
  return new Map(Object.entries(attrs));
}

// TODO: we need a past tense to present converter
export function createWidgetEvents(events: Record<string, string>): Map<string, string> {
  return new Map(
    Object.entries(events).map(([eventName, realEventName]) => [
      camelCase(eventName),
      realEventName,
    ]),
  );
}

export function getWidgetCtor<W extends NodeWidget>(widget: NodeWidget): WidgetType<W> {
  return <WidgetType<W>>widget.constructor;
}

export function isFlexLayout(layout: any): layout is FlexLayout {
  return layout instanceof FlexLayout;
}