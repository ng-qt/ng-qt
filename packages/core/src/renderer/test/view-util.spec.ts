import { NgQtView } from '@ng-qt/common';
import { View } from '@ng-qt/common/widgets/view';

import { ViewUtil } from '../view-util';

describe('ViewUtil', () => {
  let viewUtil: ViewUtil;
  let parent: NgQtView;

  beforeEach(() => {
    viewUtil = new ViewUtil();
    parent = new View();
  });

  describe('insertChild', () => {
    beforeEach(() => {
      // @ts-ignore
      viewUtil.addToQueue = jest.fn();
      // @ts-ignore
      viewUtil.findNextVisual = jest.fn();
      // @ts-ignore
      viewUtil.addToVisualTree = jest.fn();
    });

    it(`should add parent to child's parentNode`, () => {
      const child: Ngq = new View();

      // @ts-ignore
      viewUtil.insertChild(parent, child);

      expect(child.parentNode).toBe(parent);
    });
  });
});
