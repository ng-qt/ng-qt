import { NgModule } from '@angular/core';
import { NgQtModule } from '@ng-qt/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NgQtModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
