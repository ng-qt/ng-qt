import { QPushButton, QPushButtonEvents } from '@nodegui/nodegui';
import { createWidgetEvents, NgQtWidget } from '../src';

export class Button extends QPushButton implements NgQtWidget {
  events = createWidgetEvents(QPushButtonEvents);
}
