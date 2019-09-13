import {
  QMainWindow,
  QMainWindowEvents,
} from '@nodegui/nodegui/dist/lib/QtWidgets/QMainWindow';
import { Widget } from '@ng-qt/common';
import { FlexLayout, QWidget } from '@nodegui/nodegui';

export interface Size {
  height?: number;
  width?: number;
}

@Widget({
  events: QMainWindowEvents,
  attrs: {
    maxSize: 'setMaxSize',
    minSize: 'setMinSize',
  },
})
export class Window extends QMainWindow {
  private readonly rootLayout: FlexLayout;

  constructor() {
    super();

    this.centralWidget = new QWidget();
    this.rootLayout = new FlexLayout();

    const flexNode = this.centralWidget.getFlexNode();
    this.rootLayout.setFlexNode(flexNode);
    this.centralWidget.setLayout(this.rootLayout);
    this.setCentralWidget(this.centralWidget);
  }

  setMaxSize({ width, height }: Size) {
    this.setMaximumSize(width, height);
  }

  setMinSize({ width, height }: Size) {
    this.setMinimumSize(width, height);
  }

  // @ts-ignore
  setObjectName(name: string) {
    this.centralWidget.setObjectName(name);
  }
}
