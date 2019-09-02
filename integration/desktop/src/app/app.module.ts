import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppWindow, APP_ROOT_WINDOW } from '@ng-qt/platform';
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
      useFactory: (rootWindow: AppWindow) => {
        rootWindow.setMinimumSize(300, 400);
        rootWindow.setMaximumSize(500, 700);
      },
      deps: [APP_ROOT_WINDOW],
    },
  ],
})
export class AppModule {}
