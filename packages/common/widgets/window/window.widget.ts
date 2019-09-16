import {
  QMainWindow,
  FlexLayout,
  QWidget,
  QMainWindowEvents,
} from '@nodegui/nodegui';
import { Widget } from '@ng-qt/common';

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
  constructor() {
    super();

    const centralWidget = new QWidget();
    const rootLayout = new FlexLayout();

    const flexNode = centralWidget.getFlexNode();
    rootLayout.setFlexNode(flexNode);
    centralWidget.setLayout(rootLayout);
    this.setCentralWidget(centralWidget);
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
