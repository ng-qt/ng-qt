import { Injectable } from '@angular/core';
import { TestComponentRenderer } from '@angular/core/testing';

@Injectable()
export class NgQtTestComponentRenderer extends TestComponentRenderer {
  insertRootElement(rootElementId: string): void {}
}
