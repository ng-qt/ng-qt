import { ElementSchemaRegistry } from '@angular/compiler';
import { Injectable, SchemaMetadata } from '@angular/core';

import { isKnownWidget } from './widget-registry';

@Injectable()
export class NgQtElementSchemaRegistry implements ElementSchemaRegistry {
  allKnownElementNames(): string[] {
    return [];
  }

  getDefaultComponentElementName(): string {
    return '';
  }

  getMappedPropName(propName: string): string {
    console.log('getMappedPropName', arguments);
    return propName;
  }

  hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean {
    console.log('hasElement', arguments);
    return isKnownWidget(tagName);
  }

  hasProperty(tagName: string, propName: string, schemaMetas: SchemaMetadata[]): boolean {
    console.log('hasProperty', arguments);
    return false;
  }

  normalizeAnimationStyleProperty(propName: string): string {
    console.log('normalizeAnimationStyleProperty', arguments);
    return '';
  }

  normalizeAnimationStyleValue(
    camelCaseProp: string,
    userProvidedProp: string,
    val: string | number,
  ): { error: string; value: string } {
    console.log('normalizeAnimationStyleValue', arguments);
    return { error: '', value: '' };
  }

  securityContext(elementName: string, propName: string, isAttribute: boolean): any {
    console.log('securityContext', arguments);
  }

  validateAttribute(name: string): { error: boolean; msg?: string } {
    console.log('validateAttribute', arguments);
    return { error: false };
  }

  validateProperty(name: string): { error: boolean; msg?: string } {
    console.log('validateProperty', arguments);
    return { error: false };
  }
}
