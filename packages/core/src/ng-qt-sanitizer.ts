import { Sanitizer, SecurityContext } from '@angular/core';

export class NGQTSanitizer extends Sanitizer {
  sanitize(context: SecurityContext, value: {} | string | null): string | null {
    return null;
  }
}
