import { FlexLayout, QMainWindow, QWidget } from '@nodegui/nodegui';
import { InjectionToken } from '@angular/core';

export const APP_ROOT_VIEW = new InjectionToken<QMainWindow>('APP_ROOT_VIEW');


export class AppRootView extends QMainWindow {
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
