import { NgQtView } from './ng-qt-view.interface';

export interface ViewClassMeta {
  skipAddToDom?: boolean;
  insertChild?: (child: NgQtView, next?: NgQtView) => void;
  removeChild?: (child: NgQtView) => void;
}
