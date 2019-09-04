import { InjectionToken } from '@angular/core';

import { AppRootView } from './interfaces';

export const APP_ROOT_VIEW = new InjectionToken<AppRootView>('APP_ROOT_VIEW');

export const WIDGET_META = Symbol('WIDGET_META');
