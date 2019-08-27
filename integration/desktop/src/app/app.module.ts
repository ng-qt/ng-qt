import { NgModule } from '@angular/core';
import { NGQTModule } from '@ng-qt/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NGQTModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
