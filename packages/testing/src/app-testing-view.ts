import { AppRootView } from '@ng-qt/common';
import { View } from '@ng-qt/common/widgets/view';

export class AppTestingView extends View implements AppRootView {
  setHostObjectName(name: string): void {
    this.setObjectName(name);
  }
}
