import { NodeLayout, FlexLayout, NodeWidget } from '@nodegui/nodegui';
import { Injectable, PLATFORM_INITIALIZER, Type } from '@angular/core';

export type NodeWidgetResolver = () => Type<NodeWidget>;

export const widgetRegistry = new Map<string, NodeWidgetResolver>();

export function isKnownWidget(name: string) {
  return widgetRegistry.has(name);
}

export function registerWidget(name: string, resolver: NodeWidgetResolver): void {
  widgetRegistry.set(name, resolver);
}

export function resolveWidget(name: string): Type<NodeWidget> {
  const resolver = widgetRegistry.get(name);

  if (!resolver) {
    throw new TypeError(`No known component for widget ${name}`);
  }

  try {
    return resolver();
  } catch (e) {
    throw new TypeError(`Could not load view for ${name}.${e}`);
  }
}

// Register core widgets
registerWidget('Window', () => require('@ng-qt/core/window').WindowWidget);
registerWidget('View', () => require('@ng-qt/core/view').ViewWidget);
registerWidget('Image', () => require('@ng-qt/core/image').ImageWidget);

/*@Injectable()
export class WidgetRegistry {
  public readonly resolvers = new Map<string, NodeWidgetResolver>();

  has(name: string): boolean {
    return this.resolvers.has(name);
  }

  isWidget(widget: any): widget is NodeWidget {
    return widget instanceof NodeWidget;
  }

  getNextSibling(layout: NodeLayout) {
    return (layout as any).children.values().next().value;
  }

  isNodeLayout(layout: any): layout is NodeLayout {
    return layout instanceof NodeLayout;
  }

  isFlexLayout(layout: any): layout is FlexLayout {
    return layout instanceof FlexLayout;
  }

  setFlexLayout(widget: NodeWidget) {
    const flexLayout = new FlexLayout();

    const parentFlexNode = widget.getFlexNode();
    flexLayout.setFlexNode(parentFlexNode);

    widget.layout = flexLayout;
  }

  resolve(name: string): Type<NodeWidget> {
    const resolver = this.resolvers.get(name);

    if (!resolver) {
      throw new TypeError(`No known component for widget ${name}`);
    }

    try {
      return resolver();
    } catch (e) {
      throw new TypeError(`Could not load view for ${name}.${e}`);
    }
  }
}*/
