import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { platformNgQtDynamic } from '@ng-qt/platform';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformNgQtDynamic()
  .bootstrapModule(AppModule)
  .catch(e => console.error(e));
