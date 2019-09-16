import { FlexLayout, NodeWidget } from '@nodegui/nodegui';
import { NgQtView } from '@ng-qt/common';

export interface AppRootView extends NodeWidget, NgQtView {
  layout: FlexLayout;
  // setHostObjectName(name: string): void;
}
