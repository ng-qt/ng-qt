import { NgModule } from '@angular/core';

import { registerWidget } from './register-widget';

@NgModule({
  providers: [
    // Register core widgets
    registerWidget('View', () => require('@ngq/core/view').ViewWidget),
    registerWidget('Image', () => require('@ngq/core/image').ImageWidget),
  ],
})
export class NGQModule {}