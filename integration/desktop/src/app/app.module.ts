import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppWindow } from '@ng-qt/platform';
import { CommonModule } from '@angular/common';
import { NgQtModule } from '@ng-qt/core';
import { APP_ROOT_VIEW } from '@ng-qt/common';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [CommonModule, NgQtModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (rootWindow: AppWindow) => {
        rootWindow.setMinimumSize(300, 400);
        rootWindow.setMaximumSize(500, 700);
      },
      deps: [APP_ROOT_VIEW],
    },
  ],
})
export class AppModule {}
