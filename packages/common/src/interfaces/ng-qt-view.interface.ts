import { FlexLayout, NodeWidget } from '@nodegui/nodegui';

import { CustomViewClass } from './custom-view-class.interface';

export interface NgQtView extends NodeWidget, Partial<CustomViewClass> {
  styles: Map<string, string>;
  layout: FlexLayout;
  parentNode: NgQtView;
  nextSibling: NgQtView;
  firstChild: NgQtView;
  lastChild: NgQtView;
}
