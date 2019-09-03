// Inspired from NativeScript Angular

import { FlexLayout } from '@nodegui/nodegui';
import { NgZone } from '@angular/core';
import {
  hasViewMeta,
  isDetachedElement,
  isFlexLayout,
  isFunc,
  isInvisibleNode,
  isNodeWidget,
  NgQtView,
} from '@ng-qt/common';

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

  private appendToQueue(parent: NgQtView, child: NgQtView): void {
    if (parent.lastChild) {
      parent.lastChild.nextSibling = child;
    }

    parent.lastChild = child;
  }

  private removeFromVisualTree(parent: NgQtView, child: NgQtView) {
    if (hasViewMeta(parent) && isFunc(parent.meta.removeChild)) {
      parent.meta.removeChild.call(parent, child);
    } else if (isFlexLayout(parent.layout)) {
      parent.layout.removeWidget(child);
    }
  }

  private addWidget(parent: NgQtView, child: NgQtView): void {
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

  private addToVisualTree(parent: NgQtView, child: NgQtView, next: NgQtView): void {
    // console.log('addVisualTree', !!next);

    if (hasViewMeta(parent) && isFunc(parent.meta.insertChild)) {
      parent.meta.insertChild.call(parent, child, next);
    } else if (next && isNodeWidget(parent) && isFlexLayout(parent.layout)) {
      parent.layout.insertChildBefore(child, next);
    } else if (isNodeWidget(child)) {
      this.addWidget(parent, child);
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

    if (isInvisibleNode(child)) {
      child.parentNode = parent;
    }

    if (!isDetachedElement(child)) {
      const nextVisual = this.findNextVisual(next);
      this.addToVisualTree(parent, child, nextVisual);
    }
  }
}
