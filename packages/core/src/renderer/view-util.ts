// Inspired from NativeScript Angular

import { NgZone } from '@angular/core';
import {
  hasViewMeta,
  isDetachedElement,
  isFlexLayout,
  isFunc,
  isParentNodeFlexLayout,
  NgQtView,
} from '@ng-qt/common';
import { FlexLayout } from '@nodegui/nodegui';

export class ViewUtil {
  constructor(private readonly ngZone: NgZone) {}

  private removeFromQueue(parent: NgQtView, child: NgQtView): void {
    if (parent.firstChild === child && parent.lastChild === child) {
      parent.firstChild = null;
      parent.lastChild = null;
      child.nextSibling = null;
      return;
    }

    if (parent.firstChild === child) {
      parent.firstChild = child.nextSibling;
    }

    const previous = this.findPreviousElement(parent, child);
    if (parent.lastChild === child) {
      parent.lastChild = previous;
    }

    if (previous) {
      previous.nextSibling = child.nextSibling;
    }

    child.nextSibling = null;
  }

  private addToQueue(parent: NgQtView, child: NgQtView, previous: NgQtView, next?: NgQtView): void {
    if (previous) {
      previous.nextSibling = child;
    } else {
      parent.firstChild = child;
    }

    if (next) {
      child.nextSibling = next;
    } else {
      this.appendToQueue(parent, child);
    }
  }

  private appendToQueue(parent: NgQtView, view: NgQtView): void {
    if (parent.lastChild) {
      parent.lastChild.nextSibling = view;
    }

    parent.lastChild = view;
  }

  private removeFromVisualTree(parent: NgQtView, child: NgQtView) {
    if (hasViewMeta(parent) && isFunc(parent.meta.removeChild)) {
      parent.meta.removeChild.call(parent, child);
    } else if (isFlexLayout(parent.layout)) {
      parent.layout.removeWidget(child);
    }
  }

  private addToVisualTree(parent: NgQtView, child: NgQtView, next: NgQtView): void {
    if (hasViewMeta(parent) && isFunc(parent.meta.insertChild)) {
      parent.meta.insertChild.call(parent, child, next);
    } else {
      // appendChild
      if (!isFlexLayout(parent.layout)) {
        const flexLayout = new FlexLayout();

        const parentFlexNode = parent.getFlexNode();
        flexLayout.setFlexNode(parentFlexNode);

        parent.layout = flexLayout;
        parent.setLayout(parent.layout);
      }

      parent.layout.addWidget(child);
      parent.show();
    }
  }

  // HINT: This one is O(n) - use carefully
  private findPreviousElement(parent: NgQtView, child: NgQtView): NgQtView {
    let previous = parent.firstChild;

    // since detached elements are not added to the visual tree,
    // we need to find the actual previous sibling of the view,
    // which may as well be an invisible node
    while (previous && previous !== child && previous.nextSibling !== child) {
      previous = previous.nextSibling;
    }

    return previous;
  }

  private findNextVisual(next: NgQtView): NgQtView {
    while (next && isDetachedElement(next)) {
      next = next.nextSibling;
    }

    return next;
  }

  removeChild(parent: NgQtView, child: NgQtView) {
    if (!parent) return;

    this.removeFromQueue(parent, child);

    if (!isDetachedElement(child)) {
      this.removeFromVisualTree(parent, child);
    }
  }

  insertChild(parent: NgQtView, child: NgQtView, previous?: NgQtView, next?: NgQtView): void {
    if (!parent) return;

    if (!previous) {
      previous = parent.lastChild;
    }

    this.addToQueue(parent, child, previous, next);

    // is detached node
    if (isDetachedElement(child)) {
      child.parentNode = parent;
    }

    if (!isDetachedElement(child)) {
      const nextVisual = this.findNextVisual(next);

      if (isParentNodeFlexLayout(parent, previous)) {
        // parent.layout.insertChildBefore(child, previous);
        // console.log(parent, next);
        previous.parentNode.layout.insertChildBefore(child, previous);
        previous.parentNode.show();
      } else {
        // console.log(parent.constructor.name, child.constructor.name);
        this.addToVisualTree(parent, child, nextVisual);
      }
    }
  }
}
