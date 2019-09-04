import { NgQtView } from './ng-qt-view.interface';

export interface CustomViewClass<T = NgQtView> {
  insertChild(child: T, next?: NgQtView): void;

  removeChild(child: T): void;
}
