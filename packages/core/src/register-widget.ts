import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { NodeWidgetResolver, WidgetRegistry } from '@ngq/platform';

// Allows you to register custom widgets as well
export function registerWidget(
  name: string,
  resolver: NodeWidgetResolver,
): FactoryProvider {
  return {
    provide: APP_INITIALIZER,
    useFactory(widgetRegistry: WidgetRegistry) {
      widgetRegistry.resolvers.set(name, resolver);
    },
    deps: [WidgetRegistry],
  };
}