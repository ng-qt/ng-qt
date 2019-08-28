import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRootView, APP_ROOT_VIEW } from '@ng-qt/platform';
import { CommonModule } from '@angular/common';
import { NgQtModule } from '@ng-qt/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NgQtModule, CommonModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (rootView: AppRootView) => {
        rootView.setMinimumSize(300, 400);
        rootView.setMaximumSize(500, 700);
      },
      deps: [APP_ROOT_VIEW],
    },
  ],
})
export class AppModule {}
