import { Type } from '@angular/core';
import { NodeWidget } from '@nodegui/nodegui';

export interface WidgetType<W extends NodeWidget> extends Type<W> {
  events: Map<string, string>;
  attrs: Map<string, string>;
}
