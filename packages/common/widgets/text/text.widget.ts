import { QLabel, QLabelEvents, QPixmap } from '@nodegui/nodegui';
import { createWidgetAttributes, createWidgetEvents } from '../../index';
import { ViewAttrs } from '../view';

export interface TextAttrs {
  // children?: string;
  wordWrap?: boolean;
  pixmap?: QPixmap;
}

export const TextAttrs = Object.freeze({
  // children: 'setText',
  wordWrap: 'setWordWrap',
  pixMap: 'setPixmap',
});

export class Text extends QLabel {
  static readonly events = createWidgetEvents(QLabelEvents);
  static readonly attrs = createWidgetAttributes({
    ...ViewAttrs,
    ...TextAttrs,
  });

  meta = {
    insertChild(text: string) {
      this.setText(text);
    },
  };
}
