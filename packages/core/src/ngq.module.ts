import { NgModule } from '@angular/core';

import { ImageModule } from '@ngq/core/image';

export const COMPONENTS = [
  ImageModule
];

@NgModule({
  imports: COMPONENTS,
  exports: COMPONENTS,
})
export class NGQModule {}