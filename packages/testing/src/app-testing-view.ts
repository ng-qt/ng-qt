import { AppRootView, NgQtView } from '@ng-qt/common';
import { View } from '@ng-qt/common/widgets/view';
import { FlexLayout } from '@nodegui/nodegui';

export class AppTestingView extends View implements AppRootView {
  layout: FlexLayout;

  setHostObjectName(name: string): void {
    this.setObjectName(name);
  }

  firstChild: NgQtView;
  lastChild: NgQtView;
  nextSibling: NgQtView;
  parentNode: NgQtView;
  styles: Map<string, string>;
}
