import { paramCase } from 'change-case';
import { NodeWidget } from '@nodegui/nodegui';

import { WidgetType } from './widget-type.interface';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`,
    );
  }
}

export function createWidgetAttributes(attrs: Record<string, string>): Map<string, string> {
  return new Map(Object.entries(attrs));
}

export function createWidgetEvents(events: Record<string, string>): Set<string> {
  return new Set(Object.values(events).map(event => paramCase(event)));
}

export function getWidgetCtor(widget: NodeWidget): WidgetType {
  return <WidgetType>widget.constructor;
}
