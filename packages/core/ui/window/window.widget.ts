import { QMainWindow, QMainWindowEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QMainWindow';
import { createWidgetEvents, NgQtWidget } from '../../src';

export class Window extends QMainWindow implements NgQtWidget {
  static readonly events = createWidgetEvents(QMainWindowEvents);
}
