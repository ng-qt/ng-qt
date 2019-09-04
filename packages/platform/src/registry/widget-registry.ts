import { WidgetType } from '@ng-qt/common';

export type WidgetResolver = () => WidgetType;

export const widgetRegistry = new Map<string, WidgetResolver>();

export function isKnownWidget(name: string) {
  return widgetRegistry.has(name);
}

export function registerWidget(name: string, resolver: WidgetResolver): void {
  widgetRegistry.set(name, resolver);
}

export function resolveWidget(name: string): WidgetType {
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
registerWidget('Window', () => require('@ng-qt/common/widgets/window').Window);
registerWidget('View', () => require('@ng-qt/common/widgets/view').View);
registerWidget('Image', () => require('@ng-qt/common/widgets/image').Image);
registerWidget('Text', () => require('@ng-qt/common/widgets/text').Text);
registerWidget('Button', () => require('@ng-qt/common/widgets/button').Button);

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
