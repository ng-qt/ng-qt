import 'zone.js/dist/zone-node';

import { platformNgQt } from '@ng-qt/platform';
import { AppModuleNgFactory } from './app/app.module.ngfactory';

platformNgQt()
  .bootstrapModuleFactory(AppModuleNgFactory)
  .catch(e => console.error(e));
