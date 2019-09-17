import { NgQtView } from '@ng-qt/common';
import { NgZone } from '@angular/core';

import {
  CONTENT_ATTR,
  HOST_ATTR,
  InlineStyles,
  NgQtSharedStylesHost,
} from '../shared-styles-host';

const testInlineStyle = 'color:red;font-size:12px';

describe('NgQtSharedStylesHost', () => {
  let sharedStylesHost: any | NgQtSharedStylesHost;
  let ngZone: any | NgZone;
  let node: any | NgQtView = {};

  beforeEach(() => {
    ngZone = new NgZone({});
    sharedStylesHost = new NgQtSharedStylesHost(ngZone);

    node.setStyleSheet = jest.fn();
    node.styles = new Map([['color', 'red'], ['font-size', '12px']]);

    sharedStylesHost.setNodeInlineStyle = jest.fn();
    // invoke tasks immediately
    ngZone.run = (cb: Function) => cb();
  });

  describe('nodeStylesToInlineStyle', () => {
    it(`should return "${testInlineStyle}"`, () => {
      const inlineStyles = sharedStylesHost.nodeStylesToInlineStyle(node);
      expect(inlineStyles).toMatchSnapshot();
      expect(inlineStyles).toEqual(testInlineStyle);
    });
  });

  describe('removeInlineStyle', () => {
    it('should remove property from node styles', () => {
      sharedStylesHost.removeInlineStyle(node, 'font-size');

      expect(node.styles).toMatchSnapshot();
      expect(node.styles).toEqual(new Map([['color', 'red']]));
      // expect(sharedStylesHost.setNodeInlineStyle).toHaveBeenCalledWith(node);
    });
  });

  describe('addInlineStyle', () => {
    it('should add style property if inline styles is object', () => {
      const inlineStyles: InlineStyles = {
        property: 'max-width',
        value: '50px',
      };

      sharedStylesHost.addInlineStyle(node, inlineStyles);

      expect(node.styles).toMatchSnapshot();
      expect(node.styles).toMatchObject(
        new Map([...node.styles, ['max-width', '50px']]),
      );
    });

    it('should convert inline styles to node styles', () => {
      sharedStylesHost.addInlineStyle(node, testInlineStyle);

      expect(node.styles).toMatchSnapshot();
      expect(node.styles).toMatchObject(
        new Map([['color', 'red'], ['font-size', '12px']]),
      );
    });
  });

  describe('addHostStyles', () => {
    let type: any;

    beforeEach(() => {
      type = {};
    });

    it('should not set stylesheet if styles are empty', () => {
      type.styles = ['  ', '', '\n', '\r\n'];

      sharedStylesHost.addHostStyles(node, type);
      expect(node.setStyleSheet).not.toHaveBeenCalled();
    });

    it(`should replace [_nghost-%COMP%] with component id`, () => {
      type.id = 'c0';
      type.styles = [
        `
        ${HOST_ATTR} {
          padding: 24px;
        }
      `,
      ];

      sharedStylesHost.addHostStyles(node, type);
      expect(node.setStyleSheet).toHaveBeenCalledWith(
        `
        #${type.id} {
          padding: 24px;
        }
      `.trim(),
      );
    });

    // `should remove ${CONTENT_ATTR} from styles`
    it(`should remove [_ngcontent-%COMP%] from styles`, () => {
      type.styles = [
        `
        #btn${CONTENT_ATTR} {
          color: blue;
        }
         
        #danger-btn${CONTENT_ATTR} {
          color: red;
        }
      `,
      ];

      sharedStylesHost.addHostStyles(node, type);
      expect(node.setStyleSheet).toHaveBeenCalledWith(
        `
        #btn {
          color: blue;
        }
         
        #danger-btn {
          color: red;
        }
      `.trim(),
      );
    });
  });
});
