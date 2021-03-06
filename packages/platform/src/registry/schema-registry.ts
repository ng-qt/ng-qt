import { ElementSchemaRegistry } from '@angular/compiler';
import { SecurityContext } from '@angular/compiler/src/core';
import { Injectable, SchemaMetadata } from '@angular/core';

import { isKnownWidget, resolveWidget } from './widget-registry';
import { getWidgetMeta } from '@ng-qt/common';

@Injectable()
export class NgQtElementSchemaRegistry implements ElementSchemaRegistry {
  allKnownElementNames(): string[] {
    console.log('allKnownElementNames');
    return [];
  }

  getDefaultComponentElementName(): string {
    console.log('getDefaultComponentElementName');
    return '';
  }

  getMappedPropName(propName: string): string {
    console.log('getMappedPropName', arguments);
    return propName;
  }

  hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean {
    return isKnownWidget(tagName);
  }

  hasProperty(widgetName: string, propName: string, schemaMetas: SchemaMetadata[]): boolean {
    const widgetCtor = resolveWidget(widgetName);
    const { attrs } = getWidgetMeta(widgetCtor);
    return attrs.has(propName);
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
    return SecurityContext.NONE;
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
