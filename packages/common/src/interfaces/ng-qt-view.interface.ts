import { FlexLayout, NodeWidget } from '@nodegui/nodegui';

import { ViewClassMeta } from './view-class-meta.interface';

export interface NgQtView extends NodeWidget {
  layout: FlexLayout;
  meta: ViewClassMeta;
  parentNode: NgQtView;
  nextSibling: NgQtView;
  firstChild: NgQtView;
  lastChild: NgQtView;
}
