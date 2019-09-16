import { Sanitizer, SecurityContext } from '@angular/core';

export class NgQtSanitizer extends Sanitizer {
  sanitize(context: SecurityContext, value: {} | string | null): any {
    return value;
    // return JSON.stringify(value);
  }
}
