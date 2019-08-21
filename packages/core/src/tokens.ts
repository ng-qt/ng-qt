import { InjectionToken } from '@angular/core';
import { QApplication, QMainWindow } from '@nodegui/nodegui';

export const CUTE_APPLICATION_REF = new InjectionToken<QApplication>('CUTE_APPLICATION_REF');
export const CUTE_MAIN_WINDOW = new InjectionToken<QMainWindow>('CUTE_MAIN_WINDOW');