import { FlexLayout, QWidget } from '@nodegui/nodegui';
import { InjectionToken } from '@angular/core';
import { Window } from '@ng-qt/common/widgets/window';

export const APP_ROOT_WINDOW = new InjectionToken<AppWindow>('APP_ROOT_WINDOW');

export class AppWindow extends Window {
  public readonly centralWidget: QWidget;
  public readonly rootLayout: FlexLayout;

  constructor() {
    super();

    this.centralWidget = new QWidget();
    this.rootLayout = new FlexLayout();

    const flexNode = this.centralWidget.getFlexNode();
    this.rootLayout.setFlexNode(flexNode);
    this.centralWidget.setLayout(this.rootLayout);
    this.setCentralWidget(this.centralWidget);
  }
}
