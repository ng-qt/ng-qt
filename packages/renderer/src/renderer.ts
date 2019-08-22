import { NgZone, Renderer2, RendererStyleFlags2 } from '@angular/core';

export class CuteRenderer implements Renderer2 {
  constructor(private readonly ngZone: NgZone) {}

  readonly data: { [p: string]: any };
  destroyNode: ((node: any) => void) | null;

  addClass(el: any, name: string): void {
  }

  appendChild(parent: any, newChild: any): void {
  }

  createComment(value: string): any {
  }

  createElement(name: string, namespace?: string | null): any {
    console.log(name);
  }

  createText(value: string): any {
    console.log(value);
  }

  destroy(): void {
  }

  insertBefore(parent: any, newChild: any, refChild: any): void {
  }

  listen(target: "window" | "document" | "body" | any, eventName: string, callback: (event: any) => (boolean | void)): () => void {
    return function() {
    };
  }

  nextSibling(node: any): any {
  }

  parentNode(node: any): any {
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
  }

  removeChild(parent: any, oldChild: any, isHostElement?: boolean): void {
  }

  removeClass(el: any, name: string): void {
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
  }

  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): any {
  }

  setAttribute(el: any, name: string, value: string, namespace?: string | null): void {
    console.log(el);
  }

  setProperty(el: any, name: string, value: any): void {
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
  }

  setValue(node: any, value: string): void {
  }
}