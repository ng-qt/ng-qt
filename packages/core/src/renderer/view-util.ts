import { FlexLayout, NodeWidget, QLabel } from '@nodegui/nodegui';
import {
  isDetachedElement,
  isFlexLayout,
  isFunc,
  isInvisibleNode,
  isView,
  NgQtView,
  TextNode,
} from '@ng-qt/common';

export class ViewUtil {
  private rootView: NodeWidget;

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

  private addToQueue(
    parent: NgQtView,
    child: NgQtView,
    previous: NgQtView,
    next?: NgQtView,
  ): void {
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
    if (isView(parent) && isFunc(parent.removeChild)) {
      parent.removeChild.call(parent, child);
    } else if (isFlexLayout(parent.layout)) {
      parent.layout.removeWidget(child);
    }
  }

  private addWidget(parent: NgQtView, child: NgQtView): void {
    this.ensureParentFlexLayout(parent);

    parent.layout.addWidget(child);
    parent.show();
  }

  private ensureParentFlexLayout(parent: NgQtView) {
    if (!isFlexLayout(parent.layout)) {
      const flexLayout = new FlexLayout();

      const parentFlexNode = parent.getFlexNode();
      flexLayout.setFlexNode(parentFlexNode);

      parent.layout = flexLayout;
      parent.setLayout(parent.layout);
    }
  }

  private addToVisualTree(
    parent: NgQtView,
    child: NgQtView,
    previous: NgQtView,
    next: NgQtView,
  ): void {
    if (previous && isDetachedElement(previous) && next) {
      this.ensureParentFlexLayout(parent);
      parent.layout.insertChildBefore(child, next);
    } else {
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

  insertChild(
    parent: NgQtView,
    child: NgQtView,
    previous?: NgQtView,
    next?: NgQtView,
  ): void {
    if (!parent) return;

    if (!previous) {
      previous = parent.lastChild;
    }

    this.addToQueue(parent, child, previous, next);

    if (!child.parentNode) {
      child.parentNode = parent;
    }

    if (isInvisibleNode(child)) {
      if (!isFunc(parent.insertChild)) {
        throw new TypeError('Parent does not support text nodes');
      }

      parent.insertChild(child);
    }

    if (!isDetachedElement(child)) {
      const nextVisual = this.findNextVisual(next);
      this.addToVisualTree(parent, child, previous, nextVisual);
    }
  }
}
