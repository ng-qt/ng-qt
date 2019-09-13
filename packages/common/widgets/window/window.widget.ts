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
  layout: FlexLayout;

  constructor() {
    super();

    this.centralWidget = new QWidget();

    Object.defineProperty(this, 'layout', {
      value: new FlexLayout(),
      writable: true,
    });

    const flexNode = this.centralWidget.getFlexNode();
    this.layout.setFlexNode(flexNode);
    this.centralWidget.setLayout(this.layout);
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

  /*removeChild() {
    this.layout.removeWidget()
  }*/
}
