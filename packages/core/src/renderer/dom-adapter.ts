import { Type } from '@angular/core';
import { ɵsetRootDomAdapter as setRootDomAdapter, ɵDomAdapter as DomAdapter } from '@angular/platform-browser';

export class NGQTDomAdapter implements DomAdapter {
  static makeCurrent() {
    setRootDomAdapter(new NGQTDomAdapter());
  }

  attrToPropMap: { [p: string]: string };
  resourceLoaderType: Type<any>;

  addClass(element: any, className: string): any {}

  adoptNode(node: any): any {}

  appendChild(el: any, node: any): any {}

  attributeMap(element: any): Map<string, string> {
    return new Map();
  }

  childNodes(el: any): any[] {
    return [];
  }

  childNodesAsList(el: any): any[] {
    return [];
  }

  classList(element: any): any[] {
    return [];
  }

  clearNodes(el: any): any {}

  clone(node: any): any {}

  contains(nodeA: any, nodeB: any): boolean {
    return false;
  }

  content(node: any): any {}

  createComment(text: string): any {}

  createElement(tagName: any, doc?: any): any {}

  createElementNS(ns: string, tagName: string, doc?: any): any {}

  createEvent(eventType: string): any {}

  createHtmlDocument(): any {}

  createMouseEvent(eventType: any): any {}

  createScriptTag(attrName: string, attrValue: string, doc?: any): any {}

  createShadowRoot(el: any): any {}

  createStyleElement(css: string, doc?: any): any {}

  createTemplate(html: any): any {
    return undefined;
  }

  createTextNode(text: string, doc?: any): any {}

  dispatchEvent(el: any, evt: any): any {}

  elementMatches(n: any, selector: string): boolean {
    return false;
  }

  firstChild(el: any): any {}

  getAnimationPrefix(): string {
    return '';
  }

  getAttribute(element: any, attribute: string): any {}

  getAttributeNS(element: any, ns: string, attribute: string): any {}

  getBaseHref(doc: any): any {}

  getBoundingClientRect(el: any): any {}

  getChecked(el: any): boolean {
    return false;
  }

  getComputedStyle(element: any): any {}

  getCookie(name: string): any {}

  getData(element: any, name: string): any {}

  getDefaultDocument(): any {}

  getDistributedNodes(el: any): any[] {
    return [];
  }

  getElementsByClassName(element: any, name: string): any[] {
    return [];
  }

  getElementsByTagName(element: any, name: string): any[] {
    return [];
  }

  getEventKey(event: any): string {
    return '';
  }

  getGlobalEventTarget(doc: any, target: string): any {}

  getHistory(): any {}

  getHost(el: any): any {}

  getHref(element: any): string {
    return '';
  }

  getInnerHTML(el: any): string {
    return '';
  }

  getLocation(): any {}

  getOuterHTML(el: any): string {
    return '';
  }

  getProperty(el: Element, name: string): any {}

  getShadowRoot(el: any): any {}

  getStyle(element: any, styleName: string): string {
    return '';
  }

  getTemplateContent(el: any): any {}

  getText(el: any): any {}

  getTitle(doc: any): string {
    return '';
  }

  getTransitionEnd(): string {
    return '';
  }

  getUserAgent(): string {
    return '';
  }

  getValue(el: any): string {
    return '';
  }

  hasAttribute(element: any, attribute: string): boolean {
    return false;
  }

  hasAttributeNS(element: any, ns: string, attribute: string): boolean {
    return false;
  }

  hasClass(element: any, className: string): boolean {
    return false;
  }

  hasProperty(element: any, name: string): boolean {
    return false;
  }

  hasShadowRoot(node: any): boolean {
    return false;
  }

  hasStyle(element: any, styleName: string, styleValue?: string): boolean {
    return false;
  }

  importIntoDoc(node: any): any {}

  insertAfter(parent: any, el: any, node: any): any {}

  insertAllBefore(parent: any, ref: any, nodes: any): any {}

  insertBefore(parent: any, ref: any, node: any): any {}

  invoke(el: any, methodName: string, args: any[]): any {}

  isCommentNode(node: any): boolean {
    return false;
  }

  isElementNode(node: any): boolean {
    return false;
  }

  isPrevented(evt: any): boolean {
    return false;
  }

  isShadowRoot(node: any): boolean {
    return false;
  }

  isTemplateElement(el: any): boolean {
    return false;
  }

  isTextNode(node: any): boolean {
    return false;
  }

  log(error: any): any {}

  logError(error: any): any {}

  logGroup(error: any): any {}

  logGroupEnd(): any {}

  nextSibling(el: any): any {}

  nodeName(node: any): string {
    return '';
  }

  nodeValue(node: any): any {}

  on(el: any, evt: any, listener: any): any {}

  onAndCancel(el: any, evt: any, listener: any): Function {
    return () => {};
  }

  parentElement(el: any): any {}

  parse(templateHtml: string): any {}

  performanceNow(): number {
    return 0;
  }

  preventDefault(evt: any): any {}

  querySelector(el: any, selector: string): any {}

  querySelectorAll(el: any, selector: string): any[] {
    return [];
  }

  remove(el: any): any {}

  removeAttribute(element: any, attribute: string): any {}

  removeAttributeNS(element: any, ns: string, attribute: string): any {}

  removeChild(el: any, node: any): any {}

  removeClass(element: any, className: string): any {}

  removeStyle(element: any, styleName: string): any {}

  replaceChild(el: any, newNode: any, oldNode: any): any {}

  resetBaseElement(): void {}

  resolveAndSetHref(element: any, baseUrl: string, href: string): any {}

  setAttribute(element: any, name: string, value: string): any {}

  setAttributeNS(element: any, ns: string, name: string, value: string): any {}

  setChecked(el: any, value: boolean): any {}

  setCookie(name: string, value: string): any {}

  setData(element: any, name: string, value: string): any {}

  setInnerHTML(el: any, value: any): any {}

  setProperty(el: Element, name: string, value: any): any {}

  setStyle(element: any, styleName: string, styleValue: string): any {}

  setText(el: any, value: string): any {}

  setTitle(doc: Document, newTitle: string): any {}

  setValue(el: any, value: string): any {}

  supportsAnimation(): boolean {
    return false;
  }

  supportsCookies(): boolean {
    return false;
  }

  supportsDOMEvents(): boolean {
    return false;
  }

  supportsNativeShadowDOM(): boolean {
    return false;
  }

  supportsWebAnimation(): boolean {
    return false;
  }

  tagName(element: any): string {
    return '';
  }

  templateAwareRoot(el: any): any {}

  type(node: any): string {
    return '';
  }
}

NGQTDomAdapter.makeCurrent();
