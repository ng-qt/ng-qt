import { NodeWidget } from '@nodegui/nodegui';

import { ViewClassMeta } from './view-class-meta.interface';

export interface NgQtView extends NodeWidget {
  meta: ViewClassMeta;
  parentNode: NgQtView;
  nextSibling: NgQtView;
  firstChild: NgQtView;
  lastChild: NgQtView;
}
