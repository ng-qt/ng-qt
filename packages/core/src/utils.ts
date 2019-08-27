import { paramCase } from 'change-case';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`);
  }
}

export function createWidgetEvents(events: Record<string, string>): Set<string> {
  return new Set(Object.values(events).map(event => paramCase(event)));
}
