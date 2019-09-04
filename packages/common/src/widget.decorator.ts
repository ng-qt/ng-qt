import { createWidgetAttrs, createWidgetEvents } from './utils';
import { WidgetMeta, WidgetMetaOptions } from './interfaces';
import { defaultViewAttrs } from './default-attrs';
import { WIDGET_META } from './tokens';

/**
 * All attributes will by default inherit from View
 * @param options
 * @constructor
 */
export function Widget(options: WidgetMetaOptions = {}): ClassDecorator {
  return (target: Function): void => {
    const events = createWidgetEvents(options.events || {});
    const attrs = createWidgetAttrs({
      ...defaultViewAttrs,
      ...(options.attrs || {}),
    });

    const meta: WidgetMeta = {
      name: options.name || target.name,
      attrs,
      events,
    };

    Reflect.defineMetadata(WIDGET_META, meta, target);
  };
}
