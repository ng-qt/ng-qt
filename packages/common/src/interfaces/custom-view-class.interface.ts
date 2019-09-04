import { NgQtView } from './ng-qt-view.interface';

export interface CustomViewClass {
  insertChild?(child: NgQtView, next?: NgQtView): void;

  removeChild?(child: NgQtView): void;
}
