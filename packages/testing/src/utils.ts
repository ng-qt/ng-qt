import { NgZone } from '@angular/core';
import { resolveWidget } from '@ng-qt/platform';

export function createNgZone() {
  return new NgZone({
    enableLongStackTrace: true,
  });
}

export function createAppTestingView() {
  return new (resolveWidget('View'))();
}
