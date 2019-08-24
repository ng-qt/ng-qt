import { NodeLayout, FlexLayout, NodeWidget } from '@nodegui/nodegui';
import { Injectable, Type } from '@angular/core';

export type NodeWidgetResolver = () => Type<NodeWidget>;

@Injectable({
  providedIn: 'root',
})
export class WidgetRegistry {
  public readonly resolvers = new Map<string, NodeWidgetResolver>();

  isKnown(name: string): boolean {
    return this.resolvers.has(name);
  }

  isWidget(widget: any): widget is NodeWidget {
    return widget instanceof NodeWidget;
  }

  getNextSibling(layout: NodeLayout) {
    const children = (layout as any).children.values();
    return children.next();
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
}