import { NgModule } from '@angular/core';
import { NGQModule } from '@ngq/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [NGQModule],
  bootstrap: [AppComponent],
})
export class AppModule {}