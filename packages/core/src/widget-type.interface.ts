import { Type } from '@angular/core';
import { NodeWidget } from '@nodegui/nodegui';

export interface WidgetType extends Type<NodeWidget> {
  events: Set<string>;
  attrs: Map<string, string>;
}
