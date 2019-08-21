import { APP_INITIALIZER, Provider } from '@angular/core';
import { QApplication, QMainWindow } from '@nodegui/nodegui';

import { CUTE_APPLICATION_REF, CUTE_MAIN_WINDOW } from './tokens';

export function showMainWindow(win: QMainWindow) {
  return () => win.show();
}

export function createCuteMainWindow() {
  return () => {
    const win = new QMainWindow();
    // To prevent window from being garbage collected.
    (global as any).win = win;

    return win;
  }
}

export function createCuteApplication() {
  return QApplication.instance();
}

export const CUTE_CORE_PROVIDERS: Provider[] = [
  {
    provide: CUTE_APPLICATION_REF,
    useFactory: createCuteApplication,
  },
  {
    provide: CUTE_MAIN_WINDOW,
    useFactory: createCuteMainWindow,
  },
  {
    provide: APP_INITIALIZER,
    useFactory: showMainWindow,
    deps: [CUTE_MAIN_WINDOW],
  },
];