import { Type } from '@angular/core';
import { QWidget } from '@nodegui/nodegui';

import {
  createWidgetAttrs,
  createWidgetEvents,
  getWidgetMeta,
  isDetachedElement,
} from '../utils';
import { WIDGET_META } from '../tokens';
import { CommentNode } from '../nodes';

describe('createWidgetAttrs', () => {
  it('should create attributes map from record', () => {
    const attrs = {
      id: 'setObjectName',
    };

    expect(createWidgetAttrs(attrs)).toEqual(
      new Map<string, string>([['id', 'setObjectName']]),
    );
  });
});

describe('createWidgetEvents', () => {
  it('should create events map from record and camel case entry keys', () => {
    const events = {
      KeyPress: 'KeyPress',
    };

    expect(createWidgetEvents(events)).toEqual(
      new Map<string, string>([['keyPress', 'KeyPress']]),
    );
  });
});

describe('getWidgetMeta', () => {
  const meta = { skipAddToDom: true };

  let Widget: Type<any>;

  beforeAll(() => {
    Widget = class {};

    Reflect.defineMetadata(WIDGET_META, meta, Widget);
  });

  it('should return metadata from type', () => {
    expect(getWidgetMeta(Widget)).toStrictEqual(meta);
  });

  it('should return metadata from instance', () => {
    expect(getWidgetMeta(new Widget())).toStrictEqual(meta);
  });
});

describe('isDetachedElement', () => {
  it('should return true if argument is an InvisibleNode', () => {
    expect(isDetachedElement(new CommentNode(null))).toBe(true);
  });

  it('should return true if widget metadata has skipAddToDom', () => {
    class Widget extends QWidget {}

    Reflect.defineMetadata(WIDGET_META, { skipAddToDom: true }, Widget);

    expect(isDetachedElement(new Widget())).toBe(true);
  });
});
