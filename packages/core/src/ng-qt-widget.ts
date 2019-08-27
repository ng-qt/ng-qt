import { QWidget, QWidgetEvents } from '@nodegui/nodegui';

import { createWidgetEvents } from './utils';

export class NgQtWidget extends QWidget {
  static readonly events = createWidgetEvents(QWidgetEvents);
  // @ts-ignore
  // TODO: Should be implemented in renderer
  // setStyleSheet() {}
  // @ts-ignore
  // TODO
  // TODO: Should be implemented in renderer
  // setInlineStyle() {}
}
