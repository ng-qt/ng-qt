import { NgZone, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { FlexLayout, NodeLayout, NodeWidget, QKeyEvent, QWidget } from '@nodegui/nodegui';
import { NativeEvent } from '@nodegui/nodegui/src/lib/core/EventWidget';
import { AppWindow, isKnownWidget, resolveWidget } from '@ng-qt/platform';
import { getWidgetCtor, isFlexLayout, isNodeWidget, NgQtView } from '@ng-qt/common';

import { ViewUtil } from './view-util';

export class TextNode extends QWidget {
  /*meta = {
    skipAddToDom: true,
  };*/

  constructor(readonly value: string) {
    super();
  }
}

export class CommentNode extends QWidget {
  meta = {
    skipAddToDom: true,
  };
}

export interface ElementReference {
  previous: NgQtView;
  next: NgQtView;
}

export class NgQtRenderer implements Renderer2 {
  constructor(
    private readonly ngZone: NgZone,
    private readonly rootView: AppWindow,
    private readonly viewUtil: ViewUtil,
  ) {}

  readonly data: { [p: string]: any };
  destroyNode: ((node: any) => void) | null;

  createComment(value: string): CommentNode {
    return new CommentNode();
  }

  addClass(el: any, name: string): void {
    // console.log('addClass', arguments);
  }

  appendChild(parent: NgQtView, newChild: NgQtView): void {
    console.log(parent && parent.constructor.name, newChild.constructor.name);
    this.viewUtil.insertChild(parent, newChild);
    /*if (newChild instanceof CommentNode) {
      newChild.parent = parent;

    } else if (isTextChild(parent) && isStr(newChild)) {
      parent.setText(newChild);

    } else if (isNodeWidget(newChild)) {
      if (!isFlexLayout(parent.layout)) {
        const flexLayout = new FlexLayout();

        const parentFlexNode = parent.getFlexNode();
        flexLayout.setFlexNode(parentFlexNode);

        parent.layout = flexLayout;
        parent.setLayout(parent.layout);
      }

      parent.layout.addWidget(newChild);
      parent.show();

      (newChild as any).parent = parent;
    } else {
      // console.warn(`Use <Text /> component to add the text: ${value}`);
    }*/
  }

  createElement(name: string, namespace?: string | null): NgQtView {
    if (!isKnownWidget(name)) name = 'View';

    const widgetCtor = resolveWidget(name);
    return new widgetCtor();
  }

  // do validation when appending child
  createText(value: string): string {
    return value;
  }

  destroy(): void {}

  insertBefore(parent: NgQtView, newChild: NgQtView, { previous, next }: ElementReference): void {
    console.log(parent && parent.constructor.name, newChild.constructor.name);
    this.viewUtil.insertChild(parent, newChild, previous, next);
    /*console.log(isNodeWidget(parent) && isFlexLayout(parent.layout));
    if (isNodeWidget(parent) && isFlexLayout(parent.layout)) {
      parent.layout.insertChildBefore(newChild, refChild);
    }*/
  }

  listen(
    widget: NgQtView,
    eventName: string,
    callback: (event: any) => boolean | void,
  ): () => void {
    const { events, name } = getWidgetCtor(widget);
    const realEvent = events.get(eventName);

    if (!realEvent) {
      throw new TypeError(`${name} doesn't have event: ${eventName}`);
    }

    const zonedCallback = (nativeEvent: NativeEvent) => {
      //const keyEvt = new QKeyEvent(nativeEvent);
      //const nodeText = keyEvt.text();

      this.ngZone.run(() => callback.call(undefined, nativeEvent));
    };

    widget.addEventListener(realEvent, zonedCallback);

    return () => widget.removeEventListener(realEvent, zonedCallback);
  }

  nextSibling(node: NgQtView): ElementReference {
    return {
      previous: node,
      next: node.nextSibling,
    };
  }

  parentNode(view: NgQtView): NgQtView {
    return view.parentNode;
    /*if (node instanceof CommentNode) {
      return node.parent;
    }

    console.log(node.constructor.name);

    return isNodeWidget(node)
      ? node.layout
      : null;*/
  }

  removeAttribute(el: any, name: string, namespace?: string | null): void {
    console.log('removeAttribute', arguments);
  }

  removeChild(parent: NgQtView, oldChild: NgQtView, isHostElement?: boolean): void {
    this.viewUtil.removeChild(parent, oldChild);
  }

  removeClass(el: any, name: string): void {
    console.log('removeClass', arguments);
  }

  removeStyle(el: any, style: string, flags?: RendererStyleFlags2): void {
    console.log('removeStyle', arguments);
  }

  selectRootElement(selectorOrNode: string | any, preserveContent?: boolean): AppWindow {
    // console.log('selectRootElement', arguments);
    this.rootView.centralWidget.setObjectName(selectorOrNode);
    return this.rootView;
  }

  setAttribute(widget: NgQtView, name: string, value: any, namespace?: string | null): void {
    const { name: widgetName, attrs } = getWidgetCtor(widget);

    if (attrs) {
      const method = attrs.get(name);

      if (method) {
        widget[method].call(widget, value);
      } else {
        console.warn(`Attribute ${name} doesn't exist on widget ${widgetName}`);
      }
    }
  }

  setProperty(widget: NgQtView, name: string, value: any): void {
    this.setAttribute(widget, name, value);
  }

  setStyle(el: any, style: string, value: any, flags?: RendererStyleFlags2): void {
    // console.log('setStyle', arguments);
  }

  setValue(node: any, value: string): void {
    // console.log('setValue', arguments);
  }
}
