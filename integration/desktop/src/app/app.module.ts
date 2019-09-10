import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgQtModule } from '@ng-qt/core';

import { AppComponent } from './app.component';

console.log(NgQtModule);

@NgModule({
  imports: [NgQtModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
