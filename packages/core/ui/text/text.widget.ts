import { QLabel, QLabelEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QLabel';
import { createWidgetEvents, NgQtWidget } from '../../src';

export class Text extends QLabel implements NgQtWidget {
  static readonly events = createWidgetEvents(QLabelEvents);
}
