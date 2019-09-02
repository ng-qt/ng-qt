import { Type } from '@angular/core';

import { NgQtView } from './ng-qt-view.interface';

export interface WidgetType extends Type<NgQtView> {
  events: Map<string, string>;
  attrs: Map<string, string>;
}
