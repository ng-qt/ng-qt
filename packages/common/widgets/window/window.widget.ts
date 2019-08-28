import { QMainWindow, QMainWindowEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QMainWindow';
import { createWidgetAttributes, createWidgetEvents } from '../../src';

import { ViewAttrs } from '../view';

export class Window extends QMainWindow {
  static readonly events = createWidgetEvents(QMainWindowEvents);
  static readonly attrs = createWidgetAttributes({
    ...ViewAttrs,
  });
}
