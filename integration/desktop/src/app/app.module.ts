import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgQtModule } from '@ng-qt/core';
import { APP_ROOT_VIEW, AppRootView } from '@ng-qt/common';

import { AppComponent } from './app.component';

export function appRootViewFactory(rootView: AppRootView) {
  rootView.setMinimumSize(300, 400);
  rootView.setMaximumSize(500, 700);
}

@NgModule({
  imports: [NgQtModule],
  declarations: [AppComponent],
  /*providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appRootViewFactory,
      deps: [APP_ROOT_VIEW],
    },
  ],*/
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
