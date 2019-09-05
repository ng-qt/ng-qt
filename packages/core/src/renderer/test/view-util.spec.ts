import { CommentNode, NgQtView } from '@ng-qt/common';
import { View } from '@ng-qt/common/widgets/view';

import { ViewUtil } from '../view-util';

describe('ViewUtil', () => {
  let viewUtil: any | ViewUtil;
  let parent: any | NgQtView;

  beforeEach(() => {
    viewUtil = new ViewUtil();
    parent = new View();
  });

  describe('insertChild', () => {
    beforeEach(() => {
      viewUtil.addToQueue = jest.fn();
      viewUtil.findNextVisual = jest.fn();
      viewUtil.addToVisualTree = jest.fn();
    });

    it(`should not add child to visual tree if it's a detached element`, () => {
      const child: any = new CommentNode(null);

      viewUtil.insertChild(parent, child);

      expect(viewUtil.addToVisualTree).not.toHaveBeenCalled();
    });

    it(`should add parent's lastChild as previous if it's nil`, () => {
      const child: any = new View();
      parent.lastChild = child;

      viewUtil.insertChild(parent, child);

      expect(viewUtil.addToQueue).toHaveBeenCalledWith(parent, child, parent.lastChild, undefined);
    });

    it(`should add parent to child's parentNode`, () => {
      const child: any = new View();

      viewUtil.insertChild(parent, child);

      expect(child.parentNode).toBe(parent);
    });
  });
});
