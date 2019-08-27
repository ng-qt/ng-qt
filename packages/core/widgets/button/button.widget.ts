import { QPushButton, QPushButtonEvents } from '@nodegui/nodegui';
import { createWidgetEvents } from '../../src';

export class Button extends QPushButton {
  static readonly events = createWidgetEvents(QPushButtonEvents);
}
