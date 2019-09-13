import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { APP_ROOT_VIEW, AppRootView } from '@ng-qt/common';
import { NgQtModule } from '@ng-qt/core';

import { AppComponent } from './app.component';

export function rootViewInit(rootView: AppRootView) {
  rootView.setMaximumSize(500, 700);
  rootView.setMinimumSize(300, 400);
}

@NgModule({
  imports: [NgQtModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: rootViewInit,
      deps: [APP_ROOT_VIEW],
    },
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
