import { QLabel, QLabelEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QLabel';
import { createWidgetEvents } from '../../src';

export class Text extends QLabel {
  static readonly events = createWidgetEvents(QLabelEvents);
}
