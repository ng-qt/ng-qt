import { ElementSchemaRegistry } from '@angular/compiler';
import { SchemaMetadata, SecurityContext } from '@angular/core';

export class NGQElementSchemaRegistry extends ElementSchemaRegistry {
  allKnownElementNames(): string[] {
    return [];
  }

  getDefaultComponentElementName(): string {
    return "";
  }

  getMappedPropName(propName: string): string {
    return "";
  }

  hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean {
    return false;
  }

  hasProperty(tagName: string, propName: string, schemaMetas: SchemaMetadata[]): boolean {
    return false;
  }

  normalizeAnimationStyleProperty(propName: string): string {
    return "";
  }

  normalizeAnimationStyleValue(camelCaseProp: string, userProvidedProp: string, val: string | number): { error: string; value: string } {
    return { error: "", value: "" };
  }

  securityContext(elementName: string, propName: string, isAttribute: boolean): any {
  }

  validateAttribute(name: string): { error: boolean; msg?: string } {
    return { error: false };
  }

  validateProperty(name: string): { error: boolean; msg?: string } {
    return { error: false };
  }
}