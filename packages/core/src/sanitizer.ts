import { Sanitizer, SecurityContext } from '@angular/core';

export class NgQtSanitizer extends Sanitizer {
  sanitize(context: SecurityContext, value: {} | string | null): string | null {
    return JSON.stringify(value);
  }
}
