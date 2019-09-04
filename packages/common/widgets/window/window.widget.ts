import { QMainWindow, QMainWindowEvents } from '@nodegui/nodegui/dist/lib/QtWidgets/QMainWindow';
import { Widget } from '@ng-qt/common';

@Widget({
  events: QMainWindowEvents,
})
export class Window extends QMainWindow {}
