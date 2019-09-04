import { QLabel, QLabelEvents, QPixmap } from '@nodegui/nodegui';
import { Widget } from '@ng-qt/common';

export interface TextAttrs {
  children?: string;
  wordWrap?: boolean;
  pixmap?: QPixmap;
}

@Widget({
  events: QLabelEvents,
  attrs: {
    children: 'setText',
    wordWrap: 'setWordWrap',
    pixMap: 'setPixmap',
  },
})
export class Text extends QLabel {
  meta = {
    insertChild(text: string) {
      this.setText(text);
    },
  };
}
