import { FlexLayout, QWidget } from '@nodegui/nodegui';
import { Window } from '@ng-qt/common/widgets/window';
import { AppRootView } from '@ng-qt/common';

export class AppWindow extends Window implements AppRootView {
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

  setHostObjectName(name: string) {
    this.centralWidget.setObjectName(name);
  }
}
