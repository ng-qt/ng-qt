import { FlexLayout, QMainWindow, QWidget } from '@nodegui/nodegui';
import { InjectionToken } from '@angular/core';

export const APP_ROOT_VIEW = new InjectionToken<QMainWindow>('APP_ROOT_VIEW');

export function createRootView() {
  return new AppRootView();
}

export class AppRootView {
  public readonly window: QMainWindow;
  public readonly rootView: QWidget;
  public readonly rootViewLayout: FlexLayout;

  constructor() {
    this.window = new QMainWindow();
    this.rootView = new QWidget();
    this.rootViewLayout = new FlexLayout();

    const flexNode = this.rootView.getFlexNode();
    this.rootViewLayout.setFlexNode(flexNode);
    this.rootView.setLayout(this.rootViewLayout);
    this.window.setCentralWidget(this.rootView);
  }
}
